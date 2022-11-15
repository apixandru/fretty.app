<template>
  <svg
    class="fretboard"
    :width="width + 150"
    :height="height + 100"
    v-if="this.tuning.length > 0"
  >
    <g transform="translate(80, 50)">
      <!-- fret inlays -->
      <polygon
        v-for="inlay in inlay_polys"
        :key="'inlay_' + inlay.fret"
        :points="inlay.points"
        style="fill: #eee"
      />

      <!-- string lines -->
      <line
        v-for="string in strings"
        :key="'string_' + string.nr"
        x1="0"
        :y1="string.y"
        :x2="width"
        :y2="string.y"
        stroke="#000"
        stroke-width="1"
      />

      <!-- nut -->
      <line
        x1="0"
        y1="0"
        x2="0"
        :y2="height"
        stroke="#000"
        stroke-width="5"
        stroke-linecap="round"
      />

      <!-- frets -->
      <line
        v-for="fret in fret_lines.lines"
        :key="'fret_' + fret.nr"
        :x1="fret.x"
        :y1="fret_lines.y1"
        :x2="fret.x"
        :y2="fret_lines.y2"
        stroke="#000"
        :stroke-width="fret.width"
      />

      <!-- notes -->
      <g v-for="string in strings" :key="'ng_' + string.nr">
        <!-- hidden notes -->
        <g v-for="note in string.hidden" :key="note.key">
          <transition name="fade">
            <g v-show="hover_note % 12 === note.midiKey % 12">
              <!-- circle -->
              <rect
                v-if="note.hasOctave"
                :x="note.x - 15"
                :y="string.y - 10"
                width="30"
                height="20"
                :fill="getFillColor(note)"
                stroke="black"
                stroke-width="0.3"
                :stroke-dasharray="getDashArray(note)"
                ry="0"
                rx="0"
              />
              <circle
                v-else
                :cx="note.x"
                :cy="string.y"
                r="10"
                stroke-width="1"
                :stroke-dasharray="getDashArray(note)"
                :fill="getFillColor(note)"
                stroke="black"
              />
              <!-- name -->
              <text
                font-size="11"
                :x="note.x"
                :y="string.y"
                :font-weight="getFontWeight(note)"
                dominant-baseline="central"
                :fill="getTextColor(note)"
                text-anchor="middle"
              >
                {{ note.name }}
              </text>
            </g>
          </transition>
          <circle
            @mouseleave="onHoverLeave()"
            @mouseover="onHoverEnter(note)"
            r="10"
            :cx="note.x"
            :cy="string.y"
            fill="transparent"
          />
        </g>

        <!-- visible notes -->
        <transition-group name="list" tag="g" appear>
          <g v-for="note in string.visible" :key="note.key">
            <!-- circle -->
            <rect
              v-if="note.hasOctave"
              :x="note.x - 15"
              :y="string.y - 10"
              width="30"
              height="20"
              :fill="getFillColor(note)"
              stroke="black"
              stroke-width="0.3"
              :stroke-dasharray="getDashArray(note)"
              ry="0"
              rx="0"
            />
            <circle
              v-else
              :cx="note.x"
              :cy="string.y"
              r="10"
              :stroke-dasharray="getDashArray(note)"
              :fill="getFillColor(note)"
              stroke="black"
            />
            <!-- name -->
            <text
              font-size="11"
              :x="note.x"
              :y="string.y"
              dominant-baseline="central"
              :fill="getTextColor(note)"
              :font-weight="getFontWeight(note)"
              text-anchor="middle"
            >
              {{ note.name }}
            </text>
            <circle
              @mouseleave="onHoverLeave()"
              @mouseover="onHoverEnter(note)"
              r="10"
              :cx="note.x"
              :cy="string.y"
              fill="transparent"
            />
          </g>
        </transition-group>
      </g>
    </g>
  </svg>
</template>

<script>
import { Note, Midi } from "@tonaljs/tonal";

export default {
  name: "Fretboard",

  props: {
    tuning: {
      type: Array,
      default: () => [],
    },
    notes: {
      type: Array,
      default: () => [],
    },
    inlays: {
      default: () => [3, 5, 7, 9, 12, 15, 17, 19, 21, 24],
    },
    root: {
      type: Number,
    },
    frets: {
      type: Number,
      default: 25,
    },
    baseLength: {
      type: Number,
      default: 2180,
    },
    sharps: {
      type: Boolean,
      default: true, // TODO: "sharps", "flats" or "interval"
    },
  },

  data() {
    return {
      string_spacing: 25,
      hover_note: -1,
    };
  },

  computed: {
    width: function () {
      return this.fretpos(this.frets - 1);
    },
    height: function () {
      return (this.tuning.length - 1) * this.string_spacing;
    },
    strings: function () {
      let result = [];

      this.tuning.forEach((tuning, string) => {
        let hasOctave =
          tuning.endsWith("1") ||
          tuning.endsWith("2") ||
          tuning.endsWith("3") ||
          tuning.endsWith("4") ||
          tuning.endsWith("5") ||
          tuning.endsWith("6") ||
          tuning.endsWith("7");

        const functions = hasOctave
          ? {
              "note-to-num": (tuning, fret) => Note.midi(tuning) + fret,
              "num-to-num": (num) => num % 12,
              "num-to-name": (num) =>
                Midi.midiToNoteName(num, {
                  sharps: true,
                  pitchClass: !hasOctave,
                }),
            }
          : {
              "note-to-num": (tuning, fret) =>
                (Note.chroma(tuning) + fret) % 12,
              "num-to-num": (num) => num,
              "num-to-name": (num) => this.toname(num),
            };

        // find notes
        let normalized_notes = this.normalize(this.notes);
        let visible = [];
        let hidden = [];
        for (let fret = 0; fret < this.frets; fret++) {
          let num = functions["note-to-num"](tuning, fret);
          let numNum = functions["num-to-num"](num);
          let note = {
            hasOctave: hasOctave,
            midiKey: Midi.toMidi(num),
            num: numNum,
            fret: fret,
            name: functions["num-to-name"](num),
            x: (this.fretpos(fret - 1) + this.fretpos(fret)) / 2,
            key: "n" + string + "_" + fret,
          };
          if (normalized_notes.includes(numNum)) {
            visible.push(note);
          } else {
            hidden.push(note);
          }
        }
        if (tuning !== undefined) {
          result.push({
            nr: string,
            y: string * this.string_spacing,
            tuning: tuning,
            visible: visible,
            hidden: hidden,
          });
        }
      });
      return result;
    },
    fret_lines: function () {
      let lines = [];
      for (let i = 1; i < this.frets; i++) {
        lines.push({
          nr: i,
          x: this.fretpos(i),
        });
      }
      return {
        y1: this.height == 0 ? -this.string_spacing / 4 : 0,
        y2: this.height == 0 ? this.string_spacing / 4 : this.height,
        lines: lines,
      };
    },
    inlay_polys: function () {
      let result = [];
      if (!this.tuning.length) return result;
      for (let fret of this.inlays) {
        if (fret >= this.frets) break;

        const resize_x = 0.6;
        const resize_y = fret == 12 ? 0.8 : 0.6;

        let height = this.height;
        let top = height / 2 - (height * resize_y) / 2;
        if (height < 10) {
          height = 10;
          top = -5;
        }
        const bottom = top + height * resize_y;
        const left = this.fretpos(fret - 1);
        const right = this.fretpos(fret);
        const width = right - left;

        const nleft = left + width / 2 - (width * resize_x) / 2;
        const nright = nleft + width * resize_x;

        let points;
        if (fret == 12) {
          points = [
            [nleft, top],
            [nright, top],
            [nright, bottom],
            [nleft, bottom],
          ];
        } else {
          points = [
            [left + width / 2, top],
            [nleft, height / 2],
            [left + width / 2, bottom],
            [nright, height / 2],
          ];
        }

        let pointsstr = "";
        for (let point of points) {
          pointsstr += point[0].toString() + "," + point[1].toString() + " ";
        }

        result.push({
          fret: fret,
          points: pointsstr,
        });
      }
      return result;
    },
  },

  methods: {
    fretpos(fretNumber) {
      // https://www.liutaiomottola.com/formulae/fret.htm
      if (fretNumber <= 20) {
        const scaleLength = this.baseLength;
        // const scaleLength = 1300;
        // let weirdStuff = 1000;
        let weirdStuff = scaleLength * 0.77;
        let distanceFromNut =
          scaleLength - scaleLength / Math.pow(2, fretNumber / 12);

        let distance = Math.round(distanceFromNut * weirdStuff) / weirdStuff;
        if (fretNumber === -1) {
          distance += 50;
        }
        return distance;
      } else {
        let p19 = this.fretpos(19);
        let p20 = this.fretpos(20);
        return p20 + (p20 - p19) * (fretNumber - 20);
      }
    },
    getFillColor(note) {
      if (this.hover_note === -1 && this.root === note.num || this.hover_note === note.midiKey) {
        return "black";
      } else if (this.hover_note % 12 === note.midiKey % 12) {
        return "lightgray";
      }
      return "white";
    },
    getTextColor(note) {
      if (this.hover_note === -1 && this.root === note.num || this.hover_note === note.midiKey) {
        return "white";
      }
      return "black";
    },
    onHoverEnter(note) {
      this.hover_note = note.midiKey;
    },
    onHoverLeave() {
      this.hover_note = -1;
    },
    getFontWeight(note) {
      if (this.hover_note === -1 && this.root === note.num || this.hover_note === note.midiKey || this.hover_note % 12 === note.midiKey % 12) {
        return "bold";
      }
      return this.hover_note === note.num ? "bold" : "normal";
    },
    getDashArray(note) {
      return this.hover_note === note.num && note.num !== this.root
        ? "4,4"
        : "0";
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps,
        pitchClass: true,
      });
    },
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}
</style>
