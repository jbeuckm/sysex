# MIDI Sysex Message Transcoder

_Sysex_ implements a two-way mapper from parameters to MIDI sysex message bytes.

### Installation

`npm i sysex --save`

### Usage

Configure simple messages with a string of space-delimited hexadecimal bytes and parameter names.

```
import Sentence from 'sysex'

const simple = '43 deviceId 00 7a' // message format specification
const sysex = new Sentence(simple)

sysex.encode({ deviceId: 1 }) // [0x43, 0x01, 0x00, 0x7a]
```

To provide default parameter values, use an object to initialize the Sentence.

```
const sysex = new Sentence({
  sentence: ['12 paramValue 34'],
  defaults: {
    paramValue: [0x55]
  }
})

sysex.encode() // [0x12, 0x55, 0x34]
```

Repeated bytes can be described with a shorthand square-bracket notation.

```
const sysex = new Sentence('42 00[4] 76')

sysex.encode() // [0x42, 0x00, 0x00, 0x00, 0x00, 0x76]
```

Terms with custom Transcoders map raw values to bytes in the Sentence.

```
import Sentence, { Ascii } from 'sysex'

const sysex = new Sentence({
  sentence: [ '33 name[6] 66' ],
  transcoders: {
    name: Ascii,
  },
})

sysex.encode({ name: 'bass' }) // [0x33, 0x62, 0x61, 0x73, 0x73, 0x00, 0x00, 0x66 ]
```
