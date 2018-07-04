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
    <form class="md-layout useFlex" @submit.prevent="save">
      <md-card class="md-layout-item md-size-45 md-small-size-100">
        
        <md-card-header>
          <div class="md-title">Редактирование заявки</div>
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
                <md-table>
                    <md-table-toolbar>
                        <h1 class="md-title">Этапы</h1>
                    </md-table-toolbar>
                    <md-table-row>
                        <md-table-head>Этап</md-table-head>
                        <md-table-head>Планируемая дата</md-table-head>
                        <md-table-head>Фактическая дата</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="item in ticket.steps" :key="item.id">
                        <md-table-cell>{{ item.step_name.step }}</md-table-cell>
                        <md-table-cell>
                            <md-datepicker v-model="item.planDate" md-immediately :md-open-on-focus="false"/>
                        </md-table-cell>
                        <md-table-cell>
                            <md-datepicker v-model="item.factDate" md-immediately :md-open-on-focus="false"/>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
          </md-card-content>

            <md-card-actions>
              <md-button type="submit" class="md-primary">Сохранить</md-button>
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
      managers: [],
      cm_peoples: [],
      ci_peoples: [],
      selectCM : null,
      selectCI : null,
      selectManager : null,
      ticket: {},
    }),
    methods: {
      logout : function () {
        this.$router.push({ path: '/'})
      },
      save : function () {
      this.$http.put(`${process.env.API_URL}/ticket/${this.$route.params.id}`)
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
        this.$http.get(`${process.env.API_URL}/ticket/${this.$route.params.id}`)
        .then(
          response => {this.ticket = response.data; console.log(this.ticket.steps, 'ticket');},
          response => console.log(response, 'error')
          ),
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