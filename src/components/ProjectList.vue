<template>
  <div class="container">
  <div class="row">
    <div class="col-md-4 justify-content-center">
    <UserProfile :user="user" />
    </div>
    <div class="col-md-8">
    <div style="text-align: center;" v-if="user.length!=0 && projects.length==0">
      No user projects found
    </div>
    <ul class='list-group' v-bind:key="index" v-for="(project,index) in projects">
      <li class='list-group-item' v-bind:key="index" v-for="(file,index) in project.files">
        <div class="row">
          <div class='col-md-2'>
            <img class="rounded-circle w-100" :src="user.avatar_url">
          </div>
          <div class='col-md-8'>
            <a :href="user.html_url">
              {{user.login}}
            </a>/
            <a href="#">
              {{file.filename}}
            </a>
            <div class="created_at">
              {{convertDate(project.created_at) }}
            </div>
            <ForkList :ref="'ForkList'+project.id" :url="project.forks_url"/>
          </div>
          <div class='col-md-2'>
            <span class="language float-right badge bg-success" v-if="file.language">
              {{ file.language }}
            </span>
          </div>
          <CodeView :url="file.raw_url"/>
        </div>
      </li>
    </ul>
    </div>
  </div>
  </div>
</template>
<script>
import ForkList from '../components/ForkList.vue'
import UserProfile from '../components/UserProfile.vue'
import CodeView from '../components/CodeView.vue'
import * as moment from "moment/moment"

export default 
{
  components:{ForkList,UserProfile,CodeView},
  methods:
  {
    convertDate(date)
    {
      return moment(date).fromNow();
    },
  },
  data()
  {
    return {
      projects:[],
      user:[]
    }
  }
}
</script>