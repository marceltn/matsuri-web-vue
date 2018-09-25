<template>
  <div id="page-item">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Add new Item">
            <div slot="widget-content">
              <v-container>
                <v-card ref="form">
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>Code</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        label="Code without space"
                        v-model="code"
                        :rules="[rules.required,rules.nospace]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>Description</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        name="description"
                        label="Description"
                        color="primary"
                        v-model="description"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>Selled</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        name="selled"
                        label="Only Number"
                        v-model="selled"
                        :rules="[rules.onlynumbers]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>Stock</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        name="stock"
                        label="Only Number"
                        v-model="stock"
                        :rules="[rules.onlynumbers]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>Price</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        name="price"
                        label="Amount"
                        v-model="price"
                        prefix="$"
                        mask="##,##"
                        :rules="[rules.onlynumbers]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-divider class="mt-5"></v-divider>
                  <v-card-actions>
                    <v-btn flat>Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="submit">Submit</v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import axios from '../axios';

export default {
  components: {
    VWidget
  },
  data () {
    return {
      code: '',
      description: '',
      selled: '0',
      stock: '200',
      price: '8000',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        nospace: (value) => {
          const pattern = /^[^\s]+$/;
          return pattern.test(value) || 'Don\'t allow space.';
        },
        onlynubmers: (value) => {
          const pattern = /^[0-9]+$/;
          return pattern.test(value) || 'Only numbers.';
        }
      }  
    };
  },
  computed: {
  },  
  methods: {
    submit () {
      axios.post('/items', {
        code: this.code,
        description: this.description,
        selled: this.selled,
        stock: this.stock,
        price: this.price
      })
        .then(response => {
          console.log('[item] success: ' + response);
        })
        .catch(error => {
          console.log('[item] error: ' + error);
        });
    }
  }
};
</script>