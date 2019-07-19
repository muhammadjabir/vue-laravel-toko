<template>
  <v-footer
    height="auto"
    color="primary"
  >
  <v-layout>
  <v-flex xs12>
  	<v-card
        flat
        tile
        class="primary lighten-1 white--text text-xs-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-3 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>
        <v-btn
          v-for="(link,index) in links"
          :key="index"
          color="white"
          flat
          round
          :href="link.route"
			:to="{name: link.route}"
        >
          {{ link.title }}
        </v-btn>
        <v-divider></v-divider>
       
      </v-card>

    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex
        primary
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2019 — <strong>Serba-ada Devlop Muhammad Jabir</strong>
      </v-flex>
    </v-layout>
    </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { title: 'Home', route: 'home' },
        {title:'About Us', route: 'home'},
        {title: 'Team', route: 'home'},
        {title: 'Services', route: 'home'},
        {title:  'Blog', route: 'home'},
        {title:   'Contact Us', route: 'home'}
       
      ],
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
  }
</script>