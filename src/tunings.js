export const Tunings = Object.freeze([
  {
    instrument: "Guitar (6-String)",
    tunings: [
      { name: "Standard", tuning: "E A D G B E", full: "E2 A2 D3 G3 B3 E4" },
      { name: "Drop D", tuning: "D A D G B E", full: "D2 A2 D3 G3 B3 E4" },
      {
        name: "Half Step Down",
        tuning: "D# G# C# F# A# D#",
        full: "d#2 g#2 c#3 f#3 a#3 d#4",
      },
      {
        name: "Full Step Down",
        tuning: "D G C F A D",
        full: "d2 g2 c3 f3 a3 d4",
      },
      {
        name: "1 and 1/2 Steps Down",
        tuning: "C# F# B E G# C#",
        full: "c#2 f#2 b2 e3 g#3 c#4",
      },
      {
        name: "Double Drop D",
        tuning: "D A D G B D",
        full: "d2 a2 d3 g3 b3 d4",
      },
      { name: "Drop C", tuning: "C G C F A D", full: "c2 g2 c3 f3 a3 d4" },
      {
        name: "Drop C#",
        tuning: "C# G# C# F# A# D#",
        full: "c#2 g#2 c#3 f#3 a#3 d#4",
      },
      {
        name: "Drop B",
        tuning: "B F# B E G# C#",
        full: "b1 f#2 b2 e3 g#3 c#4",
      },
      {
        name: "Drop A#",
        tuning: "A# F A# D# G C",
        full: "a#1 f2 a#2 d#3 g3 c4",
      },
      { name: "Drop A", tuning: "A E A D F# B", full: "a1 e2 a2 d3 f#3 b3" },
      { name: "Open D", tuning: "D A D F# A D", full: "d2 a2 d3 f#3 a3 d4" },
      {
        name: "Open D Minor",
        tuning: "D A D F A D",
        full: "d2 a2 d3 f3 a3 d4",
      },
      { name: "Open G", tuning: "D G D G B D", full: "d2 g2 d3 g3 b3 d4" },
      {
        name: "Open G Minor",
        tuning: "D G D G A# D",
        full: "d2 g2 d3 g3 a#3 d4",
      },
      { name: "Open C", tuning: "C G C G C E", full: "c2 g2 c3 g3 c4 e4" },
      {
        name: "Open C#",
        tuning: "C# F# B E G# C#",
        full: "c#2 f#2 b3 e3 g#3 c#4",
      },
      {
        name: "Open C Minor",
        tuning: "C G C G C D#",
        full: "c2 g2 c3 g3 c4 d#4",
      },
      { name: "Open E", tuning: "E G# D E B E", full: "e2 g#2 d3 e3 b3 e4" },
      {
        name: "Open E Minor7",
        tuning: "E B D G B E",
        full: "e2 b2 d3 g3 b3 e4",
      },
      {
        name: "Open G Major7",
        tuning: "D G D F# B D",
        full: "d2 g2 d3 f#3 b3 d4",
      },
      {
        name: "Open A Minor",
        tuning: "E A E A C E",
        full: "e2 a2 e3 a3 c4 e4",
      },
      {
        name: "Open A Minor7",
        tuning: "E A E G C E",
        full: "e2 a2 e3 g3 c4 e4",
      },
      { name: "Open E", tuning: "E B E G# B E", full: "e2 b2 e3 g#3 b3 e4" },
      { name: "Open A", tuning: "E A C# E A E", full: "e2 a2 c#3 e3 a3 e4" },
      {
        name: "C Tuning",
        tuning: "C F A# D# G C",
        full: "c2 f2 a#2 d#3 g3 c4",
      },
      {
        name: "C# Tuning",
        tuning: "C# F# B E G# C#",
        full: "c#2 f#2 b2 e3 g#3 c#4",
      },
      {
        name: "Bb Tuning",
        tuning: "A# D# G# C# F A#",
        full: "a#1 d#2 g#2 c#3 f3 a#3",
      },
      {
        name: "A to A (Baritone)",
        tuning: "A D G C E A",
        full: "a1 d2 g2 c3 e3 a3",
      },
      { name: "D A D D D D", tuning: "D A D D D D", full: "d2 a2 d3 d3 d4 d4" },
      { name: "C G D G B D", tuning: "C G D G B D", full: "c2 g2 d3 g3 b3 d4" },
      { name: "C G D G B E", tuning: "C G D G B E", full: "c2 g2 d3 g3 b3 e4" },
      { name: "D A D E A D", tuning: "D A D E A D", full: "d2 a2 d3 e3 a3 d4" },
      { name: "D G D G A D", tuning: "D G D G A D", full: "d2 g2 d3 g3 a3 d4" },
      { name: "Open Dsus2", tuning: "D A D G A D", full: "d2 a2 d3 g3 a3 d4" },
      { name: "Open Gsus2", tuning: "D G D G C D", full: "d2 g2 d3 g3 c4 d4" },
      { name: "G", tuning: "D G D G B E", full: "d2 g2 d3 g3 b3 e4" },
      { name: "Modal G", tuning: "D G D G C D", full: "d2 g2 d3 g3 c4 d4" },
      { name: "Overtone", tuning: "C E G A# C D", full: "c3 e3 g3 a#3 c4 d4" },
      { name: "Pentatonic", tuning: "A C D E G A", full: "a2 c3 d3 e3 g3 a4" },
      {
        name: "Minor Third",
        tuning: "C D# F# A C D#",
        full: "c3 d#3 f#3 a3 c4 d#4",
      },
      {
        name: "Major Third",
        tuning: "C E G# C E G#",
        full: "c3 e3 g#3 c4 e4 g#4",
      },
      { name: "All Fourths", tuning: "E A D G C F", full: "e2 a2 d3 g3 c4 f4" },
      {
        name: "Augmented Fourths",
        tuning: "C F# C F# C F#",
        full: "c2 f#2 c3 f#3 c4 f#4",
      },
      { name: "Slow Motion", tuning: "D G D F C D", full: "d2 g2 d3 f3 c4 d4" },
      { name: "Admiral", tuning: "C G D G B C", full: "c2 g2 d3 g3 b3 c4" },
      { name: "Buzzard", tuning: "C F C G A# F", full: "c2 f2 c3 g3 a#3 f4" },
      { name: "Face", tuning: "C G D G A D", full: "c2 g2 d3 g3 a3 d4" },
      {
        name: "Four and Twenty",
        tuning: "D A D D A D",
        full: "d2 a2 d3 d3 a3 d4",
      },
      { name: "Ostrich", tuning: "D D D D D D", full: "d2 d3 d3 d3 d4 d4" },
      { name: "Capo 20", tuning: "C G D D# D D#", full: "c2 g2 d3 d#3 d4 d#4" },
      { name: "Balalaika", tuning: "E A D E E A", full: "e2 a2 d3 e3 e3 a3" },
      { name: "Charango", tuning: " G C E A E", full: "g2 c3 e3 a3 e4" },
      { name: "Cittern One", tuning: "C F C G C D", full: "c2 f2 c3 g3 c4 d4" },
      { name: "Cittern Two", tuning: "C G C G C G", full: "c2 g2 c3 g3 c4 g4" },
      {
        name: "Dobro Open G",
        tuning: "G B D G B D",
        full: "g2 b2 d3 g3 b3 d4",
      },
      { name: "Lefty", tuning: "E B G D A E", full: "e4 b3 g3 d3 a2 e2" },
      { name: "Mandoguitar", tuning: "C G D A E B", full: "c2 g2 d3 a3 e4 b4" },
      { name: "Rusty Cage", tuning: "B A D G B E", full: "b1 a2 d3 g3 b3 e4" },
    ],
  },
  {
    // http://bassguitarplayerworld.com/advanced/alternate-tunings/
    // https://www.schoolofrock.com/resources/bass-guitar/beginners-guide-to-tuning-a-bass-guitar
    instrument: "Bass (4-String)",
    tunings: [
      { name: "Standard", tuning: "E A D G", full: "E1 A1 D2 G2" },
      { name: "Drop D", tuning: "D A D G" },
      { name: "Drop C", tuning: "C G C F" },
      { name: "Drop B", tuning: "B F# B E" },
      { name: "D Standard", tuning: "D G C F" },
      { name: "C to thirds", tuning: "C G C G" },
    ],
  },
  {
    instrument: "Bass (5-String)",
    tunings: [
      { name: "Standard", tuning: "B E A D G", full: "B0 E1 A1 D2 G2" },
      { name: "High C", tuning: "E A D G C" },
    ],
  },
  {
    instrument: "Bass (6-String)",
    tunings: [{ name: "Standard", tuning: "B E A D G C" }],
  },
  {
    instrument: "Ukulele",
    tunings: [
      { name: "C6", tuning: "G C E A" },
      { name: "D6", tuning: "A D F# B" },
    ],
  },
  {
    instrument: "Violin",
    tunings: [
      { name: "Standard", tuning: "G D A E" },
      { name: "Cajun", tuning: "F C G D" },
      { name: "Open G", tuning: "G D G B" },
      { name: "Sawmill", tuning: "G D G D" },
      { name: "Gee-Dad", tuning: "G D A D" },
      { name: "Open D", tuning: "D D A D" },
      { name: "High Bass, Old-Timey D", tuning: "A D A E" },
      { name: "Cross A", tuning: "A E A E" },
    ],
  },
  {
    instrument: "Russian Guitar",
    tunings: [
      { name: "Standard", tuning: "D G B D G B D" },
      { name: "Classical", tuning: "C G B D G B D" },
    ],
  },

  {
    instrument: "Sitar",
    tunings: [
      { name: "Standard", tuning: "C C G C G C F x C C B C D E F G A B C D E" },
    ],
  },
]);
