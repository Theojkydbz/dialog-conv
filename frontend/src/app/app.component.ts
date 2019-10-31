import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private API_BACKEND: string = 'http://localhost:3000';
  private CALL_METHOD: string = '/call';

  public text: string;
  public responses: Message[] = [];
  public shouldStop: boolean = false;
  public stopped: boolean = false;

  private mediaRecorder;
  private recordedChunks = [];

  public wait: boolean = false;

  @ViewChild('input', null)
  public input: ElementRef;

  constructor(
    private httpClient: HttpClient) {

  }

  ngOnInit() {
    // DEBUG
    // let message = new Message();
    // message.from = 'USER';
    // message.text = ' hjqsdj hlsqjd flqjs dfjkqs dmfj qmzen fmzqienfmq zefi,q zùopdfùqpos,df qksd fkqsdmfnqmsjdn f';
    // this.responses.push(message);
    // let message2 = new Message();
    // message2.from = 'BOT';
    // message2.text = 'Coucou';
    // this.responses.push(message2);
    // let message4 = new Message();
    // message4.from = 'USER';
    // message4.text = 'Coucou';
    // this.responses.push(message4);
    // let message3 = new Message();
    // message3.from = 'BOT';
    // message3.text = ' hjqsdj hlsqjd flqjs dfjkqs dmfj qmzen fmzqienfmq zefi,q zùopdfùqpos,df qksd fkqsdmfnqmsjdn f';
    // this.responses.push(message3);
    // let message5 = new Message();
    // message5.from = 'WAITING';
    // this.responses.push(message5);
    // let message6 = new Message();
    // message6.from = 'ACTION';
    // message6.action = 'FINAL';
    // message6.text = 'Afficher le slide';
    // this.responses.push(message6);
  }

  listen() {
    console.log('Listen');
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(
      (stream) => {
        console.log('Stream', stream)
        const context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(1024, 1, 1);

        source.connect(processor);
        processor.connect(context.destination);

        processor.onaudioprocess = (e) => {
          // Do something with the data, e.g. convert it to WAV
          // console.log(e.inputBuffer);
          this.recordedChunks.push.apply(this.recordedChunks, e.inputBuffer.getChannelData(0));
        };

        setTimeout(() => {
          processor.disconnect();
          source.disconnect();
          console.log(this.recordedChunks)
        }, 1000)

        /*
        const options = { mimeType: 'audio/webm' };
        this.mediaRecorder = new MediaRecorder(stream, options);
        console.log('MediaREcorder', this.mediaRecorder)

        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            this.recordedChunks.push(e.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          let blob = new Blob(this.recordedChunks);
          console.log('Blob', blob);
          // this.saveData(blob)
        };

        this.mediaRecorder.start();
        setTimeout(() => {
          this.mediaRecorder.stop();
        }, 3000);
        */
      }
    )
  }

  stop() {
    this.shouldStop = true;
  }

  send() {
    if (this.text) {
      this.wait = true;
      // Message User
      let message = new Message();
      message.from = 'USER';
      message.text = this.text;
      this.responses.push(message);
  
  
      // Message User
      let messageBot = new Message();
      messageBot.from = 'WAITING';
      this.responses.push(messageBot);
  
      /*
  
      // AUDIO REQUEST DATAS
  
      let linear16 = this.convertFloat32ToInt16(this.recordedChunks);
      console.log(linear16)
      let blob: any = new Blob(this.recordedChunks);
      let file: any = blob;
      file.lastModifiedDate = new Date();
      file.name = 'test.raw';
      console.log('this.recordedChunks', this.recordedChunks)
      // console.log('blob', blob)
      let audioDatas = {
        queryInput: {
          audioConfig: {
            audioEncoding: `AUDIO_ENCODING_LINEAR_16`,
            sampleRateHertz: 44100,
            languageCode: 'fr-FR',
          },
        },
        inputAudio: btoa('' + linear16),
        outputAudioConfig: {
          audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
          sampleRateHertz: 44100
        }
      }
      */
      
      let datas = {
        queryInput: {
          text: {
            text: this.text,
            languageCode: 'fr-FR',
          },
        },
        outputAudioConfig: {
          audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
          sampleRateHertz: 44100
        }
      };
      this.httpClient.post(this.API_BACKEND + this.CALL_METHOD, datas).subscribe(
        (result: any) => {
          console.log('Result', result)
          this.text = '';
          this.responses[this.responses.length-1].from = 'BOT';
          this.responses[this.responses.length-1].text = result.queryResult.fulfillmentText;
          if (result.queryResult.parameters.typeOfWorkshop && result.queryResult.parameters.TimeCount && result.queryResult.parameters.Exercice.length > 0) {
            let messageAction = new Message();
            messageAction.from = 'ACTION';
            messageAction.action = 'FINAL';
            messageAction.text = 'Afficher le slide';
            this.responses.push(messageAction);
          } else {
            this.wait = false;
            setTimeout(() => {
              this.input.nativeElement.focus();
            }, 100)
          }
          if (result.outputAudio) {
            this.playSound(result.outputAudio);
          }
        },
        (error) => {
          console.error(error);
          this.text = '';
          this.wait = false;
        }
      )
    }
  }

  actionEvent(ev: any) {
    switch(ev) {
      case 'FINAL':
        this.wait = true;
        window.open('https://docs.google.com/presentation/d/1EkVYbMHNzmEv5uPxIouopiQ5XoosGK3w6NmqUURq9us/edit#slide=id.p', '_blank');
        break;
    }
  }

  playSound(audio) {
    const sound = new Audio("data:audio/wav;base64," + audio);
    // sound.src = audio;
    // sound.src = URL.createObjectURL(audio);
    sound.play();
  }

  saveData(blob) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'test.wav';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  convertFloat32ToInt16(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l / 3);

    while (l--) {
      if (l % 3 === 0) {
        buf[l / 3] = buffer[l] * 0xFFFF;
      }
    }
    return buf.buffer
  }
}


