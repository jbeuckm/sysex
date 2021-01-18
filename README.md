# MIDI Sysex Message Transcoder

_Sysex_ implements a two-way mapper from parameters to MIDI sysex message bytes.

### Installation

`npm i sysex --save`

### Usage

With a parameter:

```
import Sentence from 'sysex'

const simple = '43 deviceId 00 7a' // simple message format specification
const sysex = new Sentence(simple)

sysex.encode({deviceId: 1}) // [0x43, 0x01, 0x00, 0x7a]
```

Providing defaults:

```
const sysex = new Sentence({
  sentence: ['12 paramValue 34'],
  defaults: {
    paramValue: [0x55]
  }
})

sysex.encode() // [0x12, 0x55, 0x34]
```
