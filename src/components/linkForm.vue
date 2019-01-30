<template>
  <div>
    <div class="q-ma-sm row flex flex-center">
      <img  style="max-width:300px" class="" :src="link.linkLogo" />
    </div>
        <q-field
          class="q-pa-xs"
          icon="account_box"
          :label-width="12"
          error-label="Name should not be empty and longer than 3 characters"
          :error="$v.link.name.$error"
          :count="16"
          helper="Name of the link"
          >
          <q-input v-model="link.name" max-length="16" placeholder="Name" @blur="$v.link.name.$touch"/>
        </q-field>
        <q-field
          class="q-pa-xs"
          icon="place"
          :label-width="3"
          helper="location of the store (country)"
          >
          <q-input v-model="link.linkLocation" placeholder="Location"/>
        </q-field>
        <q-field
          class="q-pa-xs"
          icon="link"
          :label-width="3"
          helper="link address"
          error-label="URL should not be empty"
          :error="$v.link.url.$error"
          >
          <q-input v-model="link.url" @blur="$v.link.url.$touch" placeholder="URL" prefix="http://"/>
        </q-field>
         <q-field
          class="q-pa-xs"
          icon="crop_original"
          :label-width="3"
          helper="url to the logo"
          >
          <q-input v-model="link.linkLogo" placeholder="Logo" prefix="http://"/>
        </q-field>
        <q-field
        class="q-pa-xs"
        icon="list"
        :label-width="3"
        >
        <q-select
            v-model="link.linkType"
            :options="linkTypes"
            float-label="Link Type"
          />
        </q-field>
        <q-field
          class="q-pa-xs"
          icon="text_format"
          :label-width="3"
          :count="1000"
          >
        <q-input
          v-model="link.linkAbout"
          type="textarea"
          maxLength="1000"
          :max-height="70"
          rows="5"
          placeholder="Short description of the link"
        />
        </q-field>
        <q-field
          class="q-pa-md"
          :label-width="6"
          >
          <div class="float-right">
            <q-btn
            v-show="!isAdd"
            class="q-mr-md"
            :loading="loading"
            label="Delete"
            color="red"
            @click="deleteLink"
            >
              <span slot="loading">
                <q-spinner-gears class="on-left" />
                Deleting...
              </span>
            </q-btn>
            <q-btn
              v-if="isAdd"
              :loading="loading"
              label="Submit"
              color="primary"
              @click="addLink"
            >
              <span slot="loading">
                <q-spinner-gears class="on-left" />
                Adding...
              </span>
            </q-btn>
            <q-btn
              v-else
              :loading="loading"
              label="Save"
              color="primary"
              @click="saveLink"
            >
              <span slot="loading">
                <q-spinner-gears class="on-left" />
                Saving
              </span>
            </q-btn>
          </div>
        </q-field>
  </div>
</template>

<script>
import axios from 'axios';
import Links from '../statics/Links.json';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: ['link', 'isAdd', 'id'],
  data () {
    return {
      loading: false,
      form: this.link,
      linkTypes: [
        {
          label: 'Clothes',
          value: 'Clothes'
        },
        {
          label: 'Shoes',
          value: 'Shoes'
        },
        {
          label: 'Accessories',
          value: 'Accessories'
        },
        {
          label: 'Electronics',
          value: 'Electronics'
        },
        {
          label: 'Other',
          value: 'Other'
        },
        {
          label: 'All',
          value: 'All'
        }
      ]
    }
  },
  validations: {
    link: {
      name: {required, minLength: minLength(4)},
      url: {required},
    }
  },
  methods: {
    deleteLink () {
      this.$emit('delete')      
      this.$q.dialog({
        title: 'Are you sure?',
        message: 'Wanna get rid of this link ?',
        ok: 'hell yeah!',
        cancel: 'Not now'
      }).then(() => {
        // Picked "OK"
        this.$store.commit('bookmark/deleteLink',this.id);
        this.$emit('ok')
        // axios.delete(url)
        //   .then(response => {
        //     console.log('response from server: ' + response.data.message)
        //     // display server response message
        //     vm.$emit('ok')
        //     vm.$q.notify({message: 'Deleted!',
        //       type: 'positive',
        //       color: 'positive',
        //       timeout: 3000
        //     })
        //   }).catch(function (e) {
        //     console.log(e)
        //   })
      })
        .catch(() => {
          // Picked "Cancel" or dismissed
          vm.$q.notify('User changed their minds')
        })
    },
    saveLink (id) {
      this.$v.link.$touch();
      if(this.$v.link.$error){
        this.$q.notify('Please review the fields again') 
      }
      else{
        let updatedLink = {
          name: this.link.name,
          linkType: this.link.itemType,
          url: "http://"+this.link.url,
          linkAbout: this.link.linkAbout,
          linkLogo: this.link.linkLogo?"http://"+this.link.linkLogo:'https://picsum.photos/200/300/?random',
          linkLocation: this.link.linkLocation,
        }
        this.$store.commit('bookmark/updateLink',updatedLink,id);
        this.$q.notify({message: 'Updated!',
          type: 'positive',
          color: 'positive',
          timeout:1000
        })
        

      }
      // axios.put(
      //   updateURL, {
      //     name: this.link.name,
      //     linkType: this.link.itemType,
      //     url: this.link.url,
      //     linkAbout: this.link.linkAbout,
      //     linkLogo: this.link.linkLogo,
      //     linkLocation: this.link.linkLocation
      //   }).then(function (response) {
      //   if (response.status === 200) {
      //     vm.$q.notify({message: 'Saving Success!',
      //       type: 'positive',
      //       color: 'positive',
      //       timeout: 3000
      //     })
      //   }
      //   console.log(response.status)
      // }).catch(function (error) {
      //   if (error.response) {
      //     vm.$q.notify('Error' + error.response)
      //   }
      // })
    },
    addLink () {
      this.$v.link.$touch();
      if(this.$v.link.$error){
        this.$q.notify('Please review the fields again') 
      }
      else{
        let newLink = {
          name: this.link.name,
          linkType: this.link.itemType,
          url: "http://"+this.link.url,
          linkAbout: this.link.linkAbout,
          linkLogo: this.link.linkLogo?"http://"+this.link.linkLogo:'https://picsum.photos/200/300/?random',
          linkLocation: this.link.linkLocation,
        }
        this.$store.commit('bookmark/addLink',newLink);
        this.$q.notify({message: 'Added!',
          type: 'positive',
          color: 'positive',
          timeout: 1000
        })
        newLink = {};

      }
    //   var vm = this
    //   this.loading = true
    //   axios.post('https://www.ntttam.com/links', {
    //     name: this.link.name,
    //     linkType: this.link.itemType,
    //     url: this.link.url,
    //     linkAbout: this.link.linkAbout,
    //     linkLogo: this.link.linkLogo,
    //     linkLocation: this.link.linkLocation,
    //     createdAt: new Date()
    //   }).catch(error => {
    //     if (error.response) {
    //       vm.$q.notify('Error' + error.response)
    //     }
    //   }).then((response) => {
    //     console.log(response.status)
    //     if (response.status === 200) {
    //       vm.$q.notify({message: 'Saving Success!',
    //         type: 'positive',
    //         color: 'positive',
    //         timeout: 3000
    //       })
    //       this.link = {}
    //     } else {
    //       this.$q.notify(response.data.message)
    //     }
    //     this.loading = false
    //   })
    }
  }
}
</script>

<style>
</style>
