<template>
  <div>
    <div class="q-ma-sm row flex flex-center">
    <img style="max-height:400px" :src="item.imgURL" />
    </div>
    <q-field
      class="q-pa-xs"
      icon="face"
      :label-width="12"
      error-label="Name should not be empty and longer than 3 characters"
      :error="$v.item.name.$error"
      :count="16"
      helper="Name of the item"
      >
      <q-input v-model="item.name" maxLength="16" placeholder="Name" @blur="$v.item.name.$touch"/>
    </q-field>
    <q-field
      class="q-pa-xs"
      icon="business"
      :label-width="3"
      error-label="Brand name should NOT be empty"
      :error="$v.item.brand.$error"
      :count="20"
      helper="Brand of the item"
      >
      <q-input v-model="item.brand" maxLength="20" placeholder="Brand" @blur="$v.item.brand.$touch"/>
    </q-field>
    <q-field
      class="q-pa-xs"
      icon="link"
      :label-width="3"
      error-label="Link address should NOT be empty"
      :error="$v.item.itemURL.$error"
      helper="Link address to the item"
      >
      <q-input v-model="item.itemURL" prefix="http://" @blur="$v.item.itemURL.$touch"/>
    </q-field>
      <q-field
      class="q-pa-xs"
      icon="insert_photo"
      :label-width="3"
      helper="Link to item image"
      >
      <q-input v-model="item.imgURL" prefix="http://"/>
    </q-field>
      <q-field
      class="q-pa-xs"
      icon="local_grocery_store"
      :label-width="3"
      error-label="price should NOT be empty"
      :error="$v.item.price.$error"
      >
      <q-input v-model="item.price" type="number" placeholder="Price" @blur="$v.item.price.$touch"/>
    </q-field>
    <q-field
    class="q-pa-xs"
    icon="list"
    :label-width="3"
    >
    <q-select
        v-model="item.itemType"
        :options="itemTypes"
        float-label="Item Type"
      />
    </q-field>
    <q-field
      class="q-pa-xs"
      icon="text_format"
      :label-width="3"
      :count="1000"
      helper="Short desciption of the item"
      >
    <q-input
      v-model="item.itemDescription"
      type="textarea"
      :max-height="100"
      rows="7"
      maxLength="1000"
    />
    </q-field>
    <q-field
      class="q-pa-md"
      :label-width="6"
      >
      <div class="no-wrap">
        <div class="float-right">
          <q-btn
            class="q-mr-md"
            v-show="!isAdd"
            :loading="loading"
            label="Delete"
            color="red"
            @click="deleteItem"
          >
            <span slot="loading">
              <q-spinner-gears class="on-left" />
              Deleting...
            </span>
          </q-btn>
          <q-btn
            v-if="isAdd"
            :loading="loading"
            label="Add"
            color="primary"
            @click="addItem"
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
            @click="saveItem"
          >
            <span slot="loading">
              <q-spinner-gears class="on-left" />
              Saving
            </span>
          </q-btn>
        </div>
        <q-toggle label="SALE" class="float-left" v-model="item.sale" color="red-8" />
      </div>
    </q-field>
  </div>
</template>

<script>
import {required, minLength } from 'vuelidate/lib/validators';
import axios from 'axios';
import Items from '../statics/Items.json';
export default {
  // name: 'ComponentName',
  props: ['item', 'isAdd','id'],
  data () {
    return {
      loading: false,
      itemTypes: [
        {
          label: 'Top',
          value: 'Top'
        },
        {
          label: 'Bottom',
          value: 'Bottom'
        },
        {
          label: 'Outerwear',
          value: 'Outerwear'
        },
        {
          label: 'Shoes',
          value: 'Shoes'
        },
        {
          label: 'Accessories',
          value: 'Accessories'
        }
      ]
    }
  },
  validations: {
    item: {
      name: {required, minLength: minLength(4)},
      itemURL: {required},
      brand: {required},
      price: {required},
    }
  },
  methods: {
    deleteItem () {
      this.$emit('delete')
      this.$q.dialog({
        title: 'Are you sure?',
        message: 'Wanna get rid of this item ?',
        ok: 'hell yeah!',
        cancel: 'Not now'
      }).then(() => {
        // Picked "OK"
        this.$store.commit('bookmark/deleteItem',this.id);
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
    saveItem () {
      this.$v.item.$touch();
      if(this.$v.item.$error){
        this.$q.notify('Please review the fields again') 
      }
      else{
        let updatedItem = {
         name: this.item.name,
          itemURL: "http://"+this.item.itemURL,
          itemDescription: this.item.itemDescription,
          imgURL: this.item.imgURL?"http://"+this.item.ImgURL:'https://picsum.photos/200/300/?random',
          brand: this.item.brand,
          sale: this.item.sale,
          itemType: this.item.itemType,
          price: this.item.price,
        }
        this.$store.commit('bookmark/updateItem',updatedItem,this.id);
        this.$q.notify({message: 'Updated!',
          type: 'positive',
          color: 'positive',
          timeout:1000
        })
      }
      // axios.put(
      //   updateURL, {
      //     name: this.item.name,
      //     itemType: this.item.itemType,
      //     brand: this.item.brand,
      //     itemURL: this.item.itemURL,
      //     itemDescription: this.item.itemDescription,
      //     imgURL: this.item.imgURL,
      //     price: this.item.price,
      //     sale: this.item.sale,
      //     updatedAt: new Date()
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
    addItem: function () {
       const items = Items;
      this.$v.item.$touch();
      if(this.$v.item.$error){
        this.$q.notify('Please review the fields again') 
      }
      else{
        let newItem = {
          name: this.item.name,
          itemURL: "http://"+this.item.itemURL,
          itemDescription: this.item.itemDescription,
          imgURL: this.item.imgURL?"http://"+this.item.ImgURL:'https://picsum.photos/200/300/?random',
          brand: this.item.brand,
          sale: this.item.sale,
          itemType: this.item.itemType,
          price: this.item.price,
        }
        items.push(newItem);
        this.$q.notify({message: 'Saving Success!',
          type: 'positive',
          color: 'positive',
          timeout: 2000
        })
        newItem = {};
      }
      // this.loading = true
      // const url = 'https://www.ntttam.com/items'
      // axios.post(url, {
      //   name: this.item.name,
      //   itemURL: this.item.itemURL,
      //   itemDescription: this.item.itemDescription,
      //   imgURL: this.item.ImgURL,
      //   brand: this.item.brand,
      //   sale: this.item.sale,
      //   itemType: this.item.itemType,
      //   price: this.item.price,
      //   updatedAt: new Date(),
      //   createdAt: new Date()
      // }).catch(error => {
      //   if (error.response) {
      //     vm.$q.notify('Error' + error.response)
      //   }
      // }).then((response) => {
      //   console.log(response.status)
      //   if (response.status === 200) {
      //     vm.$q.notify({message: 'Saving Success!',
      //       type: 'positive',
      //       color: 'positive',
      //       timeout: 3000
      //     })
      //     this.item = {}
      //   } else {
      //     this.$q.notify(response.data.message)
      //   }
      //   this.loading = false
      // })
    }
  }
}
</script>

<style>
</style>
