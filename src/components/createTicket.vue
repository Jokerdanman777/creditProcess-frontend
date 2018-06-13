<template>
<div >
    <!-- toolbar -->
    <md-toolbar class="md-dense">
      <h3 class="md-title" style="flex: 1">АИС "Кредитный процесс"</h3>

      <md-menu md-size="auto">
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
              <router-link tag="md-menu-item" to="/tickets">Все заявки</router-link>
              <md-menu-item @click="logout">Выйти</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <!-- create form -->
    <form class="md-layout useFlex" @submit.prevent="create">
      <md-card class="md-layout-item md-size-35 md-small-size-100">
        
        <md-card-header>
          <div class="md-title">Создание заявки</div>
        </md-card-header>
          
          <md-card-content>
                <md-field>
                  <label>Заемщик</label>
                  <md-input type="text" v-model="ticket.borrower"></md-input>
                </md-field>
                <md-field>
                  <label>Ставка</label>
                  <md-input type="text" v-model="ticket.rate"></md-input>
                </md-field>
                <md-field>
                  <label>Размер заема</label>
                  <md-input type="text" v-model="ticket.amount"></md-input>
                </md-field>
                 <md-autocomplete v-model="ticket.manager" :md-options="countries">
                  <label>Кредитный менеджер</label>
                </md-autocomplete>
                <md-autocomplete v-model="ticket.cipeople" :md-options="countries">
                  <label>Кредитный инспектор</label>
                </md-autocomplete>
                <md-autocomplete v-model="ticket.cmpeople" :md-options="countries">
                  <label>Кредитный менеджер</label>
                </md-autocomplete>
          </md-card-content>

            <md-card-actions>
              <md-button type="submit" class="md-primary">Создать</md-button>
            </md-card-actions>

          </md-card>
        </form>
</div>
</template>

<script>
  export default {
    data: () => ({
      levels: [],
      segement: [],
      peoples: [],
      ticket: {
        levelId: '',
        segementId: '',
        borrower: '',
        rate: '',
        amount: '',
        manager: '',
        cipeople: '',
        cmpeople: ''
      },
            countries: [
        'Algeria',
        'Argentina',
        'Brazil',
        'Canada',
        'Italy',
        'Japan',
        'United Kingdom',
        'United States'
      ],
    }),
    methods: {
      logout : function () {
        this.$router.push({ path: '/'})
      },
      create : function () {
        this.$router.push({ path: '/tickets'})
      },
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
  form {
        padding-top: 5%;
  }
</style>
