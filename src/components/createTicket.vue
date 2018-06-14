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
                  <md-input type="text" v-model="ticket.borrower" required></md-input>
                </md-field>
                <!-- Сегмент -->
                  <md-field>
                    <md-select  v-model="ticket.segementId" placeholder="Выберите сегмент" >
                      <md-option v-for="item in segements" :key="item.id" :value="item.id">{{ item.segement}}</md-option>
                    </md-select>
                  </md-field>
                <!-- Уровень -->
                  <md-field>
                    <md-select  v-model="ticket.levelId" placeholder="Выберите уровень" >
                      <md-option v-for="item in levels" :key="item.id" :value="item.id">{{ item.level}}</md-option>
                    </md-select>
                  </md-field>
                <md-field>
                  <label>Ставка</label>
                  <md-input type="text" v-model="ticket.rate" required></md-input>
                </md-field>
                <md-field>
                  <label>Размер заема</label>
                  <md-input type="text" v-model="ticket.amount" required></md-input>
                </md-field>
                <!-- Руководитель -->
                <md-autocomplete v-model="selectManager" :md-options="managers" @md-selected="selectedManager" @md-opened="getManagers" id="managers" required>
                  <label>Выберите руководителя</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.people.lastName + " " + item.people.firstName + " " + item.people.middleName }}</template>
                </md-autocomplete>
                <!-- Кредитный менеджер -->
                <md-autocomplete v-model="selectCM" :md-options="cm_peoples" @md-selected="selectedCM" @md-opened="getCM" id="cm" required>
                  <label>Выберите кредитного менеджера</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.people.lastName + " " + item.people.firstName + " " + item.people.middleName }}</template>
                </md-autocomplete>
                <!-- Кредитный инспектор -->
                 <md-autocomplete v-model="selectCI" :md-options="ci_peoples" @md-selected="selectedCI" @md-opened="getCI" id="ci" required>
                  <label>Выберите кредитного инспектора</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.people.lastName + " " + item.people.firstName + " " + item.people.middleName }}</template>
                </md-autocomplete>
                <!-- Этапы -->
                <md-field>
                <md-select v-model="ticket.selectSteps" placeholder="Выберите этапы" multiple>
                  <md-option v-for="item in steps" :key="item.id" :value="item.id">{{ item.step}}</md-option>
                </md-select>
                </md-field>

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
      segements: [],
      steps : [],
      managers: [],
      cm_peoples: [],
      ci_peoples: [],
      selectCM : null,
      selectCI : null,
      selectManager : null,
      ticket: {
        active: 1,
        segementId: '',
        levelId: '',
        borrower: '',
        rate: '',
        amount: '',
        manager: '',
        ci: '',
        cm: '',
        selectSteps: []
      },
    }),
    methods: {
      logout : function () {
        this.$router.push({ path: '/'})
      },
      create : function () {
      this.$http.post(`${process.env.API_URL}/ticket/new`, this.ticket)
        .then(
          response => this.$router.push({ path: '/tickets'}),
          response => console.log(response, 'error')
          )
      },
      selectedCM : function (item) {
        this.selectCM = item.people.lastName + " " + item.people.firstName + " " + item.people.middleName;
        this.ticket.cm = item.id;
      }, 
      selectedCI : function (item) {
        this.selectCI = item.people.lastName + " " + item.people.firstName + " " + item.people.middleName;
        this.ticket.ci = item.id;
      }, 
      selectedManager : function (item) {
        this.selectManager = item.people.lastName + " " + item.people.firstName + " " + item.people.middleName;
        this.ticket.manager = item.id;
      },
      getCM : function () {
        return  this.$http.get(`${process.env.API_URL}/people/cm`)
        .then(
          response => this.cm_peoples = response.data,
          response => console.log(response, 'error')
          ) 
      },
      getCI : function () {
         this.$http.get(`${process.env.API_URL}/people/ci`)
        .then(
          response => this.ci_peoples = response.data,
          response => console.log(response, 'error')
          )
      },
      getManagers : function () {
         this.$http.get(`${process.env.API_URL}/people/managers`)
        .then(
          response => this.managers = response.data,
          response => console.log(response, 'error')
          )
      }
    },
    mounted () {
      this.$http.get(`${process.env.API_URL}/ticket/segements`)
        .then(
          response => {this.segements = response.data},
          response => console.log(response, 'error')
          ),
      this.$http.get(`${process.env.API_URL}/ticket/levels`)
        .then(
          response => {this.levels = response.data},
          response => console.log(response, 'error')
          )
      this.$http.get(`${process.env.API_URL}/people/cm`)
        .then(
          response => {this.cm_peoples = response.data},
          response => console.log(response, 'error')
          ),
      this.$http.get(`${process.env.API_URL}/people/ci`)
        .then(
          response => {this.ci_peoples = response.data},
          response => console.log(response, 'error')
          ),
      this.$http.get(`${process.env.API_URL}/ticket/steps`)
        .then(
          response => {this.steps = response.data},
          response => console.log(response, 'error')
          ),
      this.$http.get(`${process.env.API_URL}/people/managers`)
        .then(
          response => this.managers = response.data,
          response => console.log(response, 'error')
          )  
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