<template>
  <q-page class="text-tertiary" padding>
    <div class="absolute-top-left dimmed background fit">
    </div>
    <div class="row justify-center col-sm-12 col-md-4 offset-md-8 col-lg-3 offset-lg-9  ">
      <div v-if="this.$store.getters['bookmark/isLogged']" class="text-white">
        <h3>Welcome to Portal</h3>
        <div class="text-center">
          <!-- <q-btn @click.native="$router.push('/items')" icon="school" label="Items" class="bg-primary"/> -->
          <q-btn @click.native="$router.push('/add')" icon="school" label="Add" class="bg-primary"/>
          <q-btn @click.native="$router.push('/admin')" icon="link" label="Admin" class="bg-primary"/>
          <q-btn @click="logout" label="Logout" class="bg-negative"/>
        </div>
      </div>
      <q-card class="text-center column q-pa-lg bg-white" v-else >
        <div>
            <h3 class="text-primary">Portal</h3>
            <p>Username: trynow</p>
            <p>Password: herewego</p>
            <q-field icon="mail" class="inputField"><q-input v-model="user.username" class="text-warning" autofocus placeholder="username"></q-input></q-field>
            <q-field icon="lock" class="inputField"><q-input v-model="user.password" class="text-warning" type="password" placeholder="password"></q-input></q-field>
            <div class="row justify-around">
              <!-- <q-btn @click.native="$router.push('/weather')" label="Signup" class="bg-light" /> -->
              <q-btn @click="login" label="Login" class="bg-warning"/>
            </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<style>
.inputField{
  margin: 1em 0;
}
.background {
  z-index: -1;
  overflow: hidden;
  background: url('../statics/wallpaper.jpg') center top no-repeat;
  background-size: cover;
}
</style>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      user: {
        username: '',
        password: '',

      }
    }
  },
  methods: {
    logout()
    {
      this.$store.dispatch('bookmark/logout').then(result=>{
        if(result){
          this.clear();
          this.$q.notify({message: 'See ya!',
                  type: 'warning',
                  color: 'warning',
                  timeout: 2000
                })
        }
      });
    },
    clear(){
      this.user.username = ''
      this.user.password = ''
    },
    login()
    {
       this.$store.dispatch('bookmark/login',this.user).then((result)=>{
         if(result.code == 'ok'){
           this.$q.notify({message: result.msg,
                 type: 'positive',
                 color: 'positive',
                 timeout: 2000
               })
          this.clear()
         }
         else if(result.code == 'wrong')
         {
           this.$q.notify({message: result.msg,
                 type: 'negative',
                 color: 'negative',
                 timeout: 2000
               })
         }
         else
         {
           this.$q.notify({message: result.msg,
                 type: 'negative',
                 color: 'negative',
                 timeout: 2000
               })
         }
       });
    }
  }
}
</script>
