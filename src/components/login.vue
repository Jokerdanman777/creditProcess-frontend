<template>
<div class="login">
    <div class="header md-layout">
        <md-card class="md-layout-item md-size-35 md-small-size-100">
        <md-card-header>
          <div class="md-title">АИС "Кредитный процесс"</div>
        </md-card-header>
      </md-card>
    </div> 

    <form class="md-layout useFlex" @submit.prevent="sign">
      <md-card class="md-layout-item md-size-35 md-small-size-100">
        
        <md-card-header>
          <div class="md-title">Войти</div>
        </md-card-header>
          
          <md-card-content>
              <md-field>
                <label>Логин</label>
                <md-input v-model="login"></md-input>
              </md-field>
                  <md-field>
                <label>Пароль</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
          </md-card-content>

            <md-card-actions>
              <md-button type="submit" class="md-primary">Войти</md-button>
            </md-card-actions>

          </md-card>
        </form>
</div>
</template>

<script>
  export default {
    data: () => ({
      login: '',
      password: '',
    }),
    methods: {
      sign: function(){
         this.$router.push({ path: '/tickets'})
      }
    } 
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .useFlex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header {
    padding-bottom: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login {
      margin-top: 60px;
  }
</style>
