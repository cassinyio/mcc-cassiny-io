  <template>
  <div style="position:relative" v-bind:class="{'open':openSuggestion}">

        <input class="form-control" type="text" placeholder="Type a blueprint...."
        :value="value"
        @input="updateValue($event.target.value)"
        @keydown.enter='enter'
        @keydown.down='down'
        @keydown.up='up'
        @keyup.esc="open=false"
        @blur="open=false">

    <ul v-show="open" class="dropdown-menu options-list">
      <li v-for="(suggestion, index) in matches" :class="{'highlighted': isActive(index)}" @mouseenter="current=index" @mousedown="suggestionClick(index)">
        <slot name="item"><strong>{{suggestion.name}}</strong>: {{suggestion.description}}</slot>
      </li>

    </ul>
  </div>
</template>

<script>
export default {

  name: 'Typeahead',
  data () {
    return {
      open: false,
      current: 0
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    suggestions: {
      type: Array,
      required: true
    }
  },
  computed: {
    // Filtering the suggestion on blueprint name or description
    matches () {
      const re = new RegExp(this.value, 'i')
      return this.suggestions.filter(function (blueprint) {
        return blueprint.name.match(re) || blueprint.description.match(re)
      }
      )
    },

    openSuggestion () {
      return this.selection !== '' &&
        this.matches.length !== 0 &&
        this.open === true
    }

  },
  methods: {

    // Triggered the input event to cascade the updates to
    // parent component
    updateValue (value) {
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
      this.$emit('input', value)
    },

    // When enter key pressed on the input
    enter () {
      this.$emit('input', this.matches[this.current].name)
      this.$emit('select', this.matches[this.current].id)
      this.open = false
    },

    // When up arrow pressed while suggestions are open
    up () {
      if (!this.open) {
        return
      }
      this.current = this.current - 1 < 0 ? this.matches.length - 1 : this.current - 1
    },

    // When down arrow pressed while suggestions are open
    down () {
      if (!this.open) {
        return
      }
      this.current = (this.current + 1) % this.matches.length
    },

    // For highlighting element
    isActive (index) {
      return index === this.current
    },

    // When one of the suggestion is clicked
    suggestionClick (index) {
      this.$emit('input', this.matches[index].name)
      this.$emit('select', this.matches[index].id)
      this.open = false
    }

  }

}
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
  z-index: 2;
}

li {
  display: inline-block;
  margin: 0 10px;
}

input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

ul.options-list {
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  border: 1px solid #dbdbdb;
  border-radius: 0 0 3px 3px;
  position: absolute;
  width: 100%;
  overflow: hidden;
}

ul.options-list li {
  width: 100%;
  flex-wrap: wrap;
  background: white;
  margin: 0;
  border-bottom: 1px solid #eee;
  color: #363636;
  padding: 7px;
  cursor: pointer;
}

ul.options-list li.highlighted {
  background: #CCCCCC
}
</style>
