<template>
  <div>
    <!-- toolbar -->
    <md-toolbar class="md-dense">
      <h3 class="md-title" style="flex: 1">АИС "Кредитный процесс"</h3>

      <md-menu md-size="auto">
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
              <router-link tag="md-menu-item" to="/create">Создать</router-link>
              <md-menu-item @click="logout">Выйти</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <!-- table -->
    <md-table class="padding" v-model="tickets" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Заявки</h1>
      </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="№">{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Заемщик">{{ item.borrower }}</md-table-cell>
            <md-table-cell md-label="Сегмент">{{ item.segement.segement }}</md-table-cell>
            <md-table-cell md-label="Уровень" >{{ item.level.level }}</md-table-cell>
            <md-table-cell md-label="Ставка">{{ item.rate }}</md-table-cell>
            <md-table-cell md-label="Размер заема" >{{ item.amount }}</md-table-cell>
            <md-table-cell md-label="Руководитель" >{{ item.managerpeople.people.lastName }} {{ item.managerpeople.people.firstName }} {{ item.managerpeople.people.middleName }}</md-table-cell>
            <md-table-cell md-label="КИ" >{{ item.cipeople.people.lastName }} {{ item.cipeople.people.firstName }} {{ item.cipeople.people.middleName }}</md-table-cell>
            <md-table-cell md-label="КМ" >{{ item.cmpeople.people.lastName }} {{ item.cmpeople.people.firstName }} {{ item.cmpeople.people.middleName }}</md-table-cell>
            <md-table-cell md-label="Управление">
 
                <md-button class="md-icon-button" name="editButton" title="Редактировать" type="button" @click="editTicket(item.id)">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" name="deleteButton" title="Удалить" type="button" @click="deleteTicket(item.id)">
                    <md-icon>delete_forever</md-icon>
                </md-button>
            
            </md-table-cell>
        </md-table-row>

    </md-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
        tickets: [],
    }),
    methods: {
      editTicket: function(itemId) {
        console.log(itemId, 'edit')
      },
      deleteTicket: function(itemId) {
      this.$http.delete(`${process.env.API_URL}/ticket/${itemId}`)
        .then(
          response => {
            if (response) {
              for (let i = 0; i < this.tickets.length; i++) {
                this.tickets[i].id == itemId ? this.tickets.splice(i, 1) : false;
              }
            }
          },
          response => console.log(response, 'error')
          )
      },
      logout : function () {
        this.$router.push({ path: '/'})
      }
    },
    mounted () {
      this.$http.get(`${process.env.API_URL}/ticket/all`)
        .then(
          response => {this.tickets = response.data},
          response => console.log(response, 'error')
          )
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .padding {
        padding-top: 3%;
  }
</style>
