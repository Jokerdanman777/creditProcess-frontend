<template>
  <div>

    <md-table v-model="users"  md-card >
      <md-table-toolbar>
        <h1 class="md-title">Заявки</h1>
      </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="№" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Заемщик" md-sort-by="gender">{{ item.gender }}</md-table-cell>
            <md-table-cell md-label="Сегмент" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Уровень" md-sort-by="email">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="Ставка" md-sort-by="title">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="Размер заема" md-sort-by="title">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="Руководитель" md-sort-by="title">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="КИ" md-sort-by="title">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="КМ" md-sort-by="title">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="Управление" md-sort-by="title">
 
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
        users: [
        {
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          gender: "Male",
          title: "Assistant Media Planner"
        },
        {
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          gender: "Female",
          title: "Account Coordinator"
        },
        {
          id: 3,
          name: "Vera Taleworth",
          email: "vtaleworth2@google.ca",
          gender: "Male",
          title: "Community Outreach Specialist"
        },
        {
          id: 4,
          name: "Lonnie Izkovitz",
          email: "lizkovitz3@youtu.be",
          gender: "Female",
          title: "Operator"
        },
        {
          id: 5,
          name: "Thatcher Stave",
          email: "tstave4@reference.com",
          gender: "Male",
          title: "Software Test Engineer III"
        },
        {
          id: 6,
          name: "Karim Chipping",
          email: "kchipping5@scribd.com",
          gender: "Female",
          title: "Safety Technician II"
        },
        {
          id: 7,
          name: "Helge Holyard",
          email: "hholyard6@howstuffworks.com",
          gender: "Female",
          title: "Internal Auditor"
        },
        {
          id: 8,
          name: "Rod Titterton",
          email: "rtitterton7@nydailynews.com",
          gender: "Male",
          title: "Technical Writer"
        },
        {
          id: 9,
          name: "Gawen Applewhite",
          email: "gapplewhite8@reverbnation.com",
          gender: "Female",
          title: "GIS Technical Architect"
        },
        {
          id: 10,
          name: "Nero Mulgrew",
          email: "nmulgrew9@plala.or.jp",
          gender: "Female",
          title: "Staff Scientist"
        },
        {
          id: 11,
          name: "Cybill Rimington",
          email: "crimingtona@usnews.com",
          gender: "Female",
          title: "Assistant Professor"
        },
        {
          id: 12,
          name: "Maureene Eggleson",
          email: "megglesonb@elpais.com",
          gender: "Male",
          title: "Recruiting Manager"
        },
        {
          id: 13,
          name: "Cortney Caulket",
          email: "ccaulketc@cbsnews.com",
          gender: "Male",
          title: "Safety Technician IV"
        },
        {
          id: 14,
          name: "Selig Swynfen",
          email: "sswynfend@cpanel.net",
          gender: "Female",
          title: "Environmental Specialist"
        },
        {
          id: 15,
          name: "Ingar Raggles",
          email: "iragglese@cbc.ca",
          gender: "Female",
          title: "VP Sales"
        },
        {
          id: 16,
          name: "Karmen Mines",
          email: "kminesf@topsy.com",
          gender: "Male",
          title: "Administrative Officer"
        },
        {
          id: 17,
          name: "Salome Judron",
          email: "sjudrong@jigsy.com",
          gender: "Male",
          title: "Staff Scientist"
        },
        {
          id: 18,
          name: "Clarinda Marieton",
          email: "cmarietonh@theatlantic.com",
          gender: "Male",
          title: "Paralegal"
        },
        {
          id: 19,
          name: "Paxon Lotterington",
          email: "plotteringtoni@netvibes.com",
          gender: "Female",
          title: "Marketing Assistant"
        },
        {
          id: 20,
          name: "Maura Thoms",
          email: "mthomsj@webeden.co.uk",
          gender: "Male",
          title: "Actuary"
        }
      ]
    }),
    methods: {
      editTicket: function(itemId) {
        console.log(itemId, 'edit')
      },
      deleteTicket: function(itemId) {
        console.log(itemId, 'delete')
      }
    },
    mounted () {
      this.$http.get('http://localhost:9000/api/ticket/all')
        .then((response) => {this.tickets = response.data},
          (response) => console.log(response, 'error'))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
