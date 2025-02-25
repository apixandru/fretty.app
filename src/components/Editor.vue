<template>
  <div>
    <div class="editor">
      <div class="columns is-multiline is-centered">
        <div class="column">
          <b-field grouped group-multiline position="is-centered">
            <!-- Tuning -->
            <b-field label="Tuning">
              <b-autocomplete
                v-model="usr_tuning"
                :data="tuning_search"
                @select="(option) => (selected = option ? option.name : '')"
                group-field="instrument"
                group-options="tunings"
                open-on-focus
                clearable
                field="tuning"
                icon="guitar"
                style="min-width: 350px"
                @input="saveSettings"
              >
                <template slot-scope="props">
                  <div style="display: flex">
                    <div style="flex: 1 1 0px">{{ props.option.name }}</div>
                    <div style="flex: 1 1 0px">{{ props.option.tuning }}</div>
                  </div>
                </template>
              </b-autocomplete>
            </b-field>

            <!-- Tonic + Scale -->
            <b-field label="Tonic:">
              <b-input
                v-model="scale.tonic"
                icon="music"
                style="max-width: 100px"
              ></b-input>
            </b-field>
            <b-field label="Scale:">
              <b-autocomplete
                v-model="scale.type"
                :data="scale_search"
                open-on-focus
                clearable
                append-to-body
                @select="(option) => (selected = option)"
              ></b-autocomplete>
            </b-field>

            <!-- Settings -->
            <b-field>
              <template slot="label">
                <span style="color: transparent; user-select: none">More</span>
              </template>

              <b-dropdown append-to-body aria-role="menu" trap-focus>
                <b-button class="button" slot="trigger" icon-left="cog"
                  >Settings</b-button
                >

                <b-dropdown-item
                  aria-role="menu-item"
                  :focusable="false"
                  custom
                  paddingless
                >
                  <form action>
                    <div class="modal-card" style="width: 300px">
                      <section class="modal-card-body">
                        <b-field label="Frets">
                          <b-numberinput
                            controls-position="compact"
                            v-model.number="frets"
                            min="1"
                            max="200"
                          ></b-numberinput>
                        </b-field>
                        <b-field label="Notation">
                          <b-field>
                            <b-radio-button
                              v-model="sharps"
                              native-value="sharps"
                            >
                              <span>#</span>
                            </b-radio-button>

                            <b-radio-button
                              v-model="sharps"
                              native-value="flats"
                            >
                              <span>b</span>
                            </b-radio-button>
                          </b-field>
                        </b-field>
                        <b-field label="Octaves">
                          <b-field>
                            <b-radio-button
                              v-model="includeOctaves"
                              native-value="true"
                            >
                              <span>Yes</span>
                            </b-radio-button>

                            <b-radio-button
                              v-model="includeOctaves"
                              native-value="false"
                            >
                              <span>No</span>
                            </b-radio-button>
                          </b-field>
                        </b-field>
                        <b-field label="Fretboard Len">
                          <b-numberinput
                            controls-position="compact"
                            v-model.number="fretboardLen"
                            min="1000"
                            max="9000"
                            step="10"
                          ></b-numberinput>
                        </b-field>
                        <!-- <b-checkbox>Show piano</b-checkbox>-->
                      </section>
                      <footer class="modal-card-foot">
                        <b-button
                          @click="$emit('remove-fretboard')"
                          icon-left="trash"
                          >remove fretboard</b-button
                        >
                      </footer>
                    </div>
                  </form>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>
            <!-- /Settings -->
          </b-field>
        </div>
      </div>

      <div class="card-image" style="text-align: center; overflow-x: auto">
        <Fretboard
          :tuning="tuning"
          :notes="notes"
          :sharps="sharps"
          :base-length="fretboardLen"
          :include-octaves="includeOctaves"
          :frets="frets"
          :root="root"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import { Note, Scale, Midi, ScaleType } from "@tonaljs/tonal";
import { Tunings } from "@/tunings";

var ALL_SCALES = [];
for (var scale of ScaleType.all()) {
  ALL_SCALES.push(scale.name);
  ALL_SCALES.push(...scale.aliases);
}

export default {
  name: "Editor",

  props: {
    initial: {
      type: String,
    },
    octaves: {
      type: String,
    },
  },

  components: {
    Fretboard,
  },

  data: function () {
    return {
      usr_tuning: this.initial,
      sharps: "sharps",
      includeOctaves: this.octaves,
      frets: 25,
      fretboardLen: 2200,
      scale: { tonic: "A", type: "minor pentatonic" },
    };
  },

  computed: {
    tuning: function () {
      if (!this.usr_tuning) return [];

      let exactTuning = Tunings.flatMap((t) => t.tunings).find(
        (tuning) => tuning.tuning === this.usr_tuning
      );

      return (exactTuning?.full || this.usr_tuning).trim().split(" ").reverse();
    },
    root: function () {
      return Note.chroma(this.scale.tonic);
    },
    notes: function () {
      return this.scale_info.notes.map(Note.chroma);
    },
    scale_info: function () {
      let name = this.scale.tonic + " " + this.scale.type;
      return Scale.get(name);
    },
    scale_search: function () {
      return ALL_SCALES.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.scale.type.toLowerCase()) >= 0
        );
      });
    },
    tuning_search() {
      const newData = [];
      Tunings.forEach((element) => {
        const items = element.tunings.filter(
          (item) =>
            item.tuning.toLowerCase().indexOf(this.usr_tuning.toLowerCase()) >=
              0 ||
            item.full?.toLowerCase().indexOf(this.usr_tuning.toLowerCase()) >= 0
        );
        if (items.length) {
          newData.push({ instrument: element.instrument, tunings: items });
        }
      });
      return newData;
    },
  },

  methods: {
    saveSettings() {
      console.log("saving");
      localStorage.setItem("tuning", this.usr_tuning);
    },
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps == "sharps",
        pitchClass: true,
      });
    },
    scale_input(x, y) {
      console.log(y);
      if (x == "") {
        return;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
