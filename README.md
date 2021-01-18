# MIDI Sysex Message Transcoder

_Sysex_ implements a two-way mapper from parameters to MIDI sysex message bytes.

### Installation

`npm i sysex --save`

### Usage

```
import Sysex from 'sysex'

const simple = '43 deviceId 00 7a' // simple message format specification
const sysex = new Sysex(simple)

sysex.encode({deviceId: 1}) // [0x43, 0x01, 0x00, 0x7a]
```
