<template>
  <div id="app">
    <notifications group="message" />
    <div class='col-md-5 center mx-auto mt-2'>
        <div class='row justify-content-center mb-4'>
          <div class='col-md-8'>
            <input class='form-control input-lg' type='text' v-model='username' placeholder="Git @username">
          </div>
          <div class='col-md-2'>
            <button :class="username.length==0 ? 'disabled' :''" v-on:click="getProjects()" class='btn btn-primary'>View</button>
          </div>
        </div>
    </div>
    <ProjectList ref="ProjectList"/>
  </div>
</template>
<script>
import ProjectList from './components/ProjectList.vue'

export default 
{
  components:{ProjectList},
  data(){
    return {
        username:"",
    }
  },
  methods:{
    getProjects(){
  
        this.getUser();
        
        fetch('https://api.github.com/users/'+this.username+'/gists', { 
                                    headers: {
                                          'Accept' : 'application/vnd.github.v3+json',
                                          'Authorization' : 'Bearer '+this.git_token,
                                      }
                                  }).then((response) => {
                                      if (response.ok) {
                                        return response.json();
                                      }
                                      return Promise.reject(response); 
                                    })
                                    .then((json) => {
                                          
                                      this.$refs.ProjectList.projects=json
                        
                                    }).catch(err=>{
                                      
                                      this.$notify({
                                                    type: 'warn',
                                                    group: 'message',
                                                    title: 'Error',
                                                    text: err.status
                                                  });

                                    })
    },
    getUser()
    {
      fetch('https://api.github.com/users/'+this.username+'', { 
                                    headers: {
                                          'Accept' : 'application/vnd.github.v3+json',
                                          'Authorization' : 'Bearer '+this.git_token,
                                      }
                                  }).then((response) => {
                                      if (response.ok) {
                                        return response.json();
                                      }
                                      return Promise.reject(response); 
                                    })
                                    .then((json) => {
                                      this.$refs.ProjectList.user=json
                                    }).catch(err=>{
                                      
                                      this.$notify({
                                                    type: 'warn',
                                                    group: 'message',
                                                    title: 'Error',
                                                    text: err.status
                                                  });

                                    });
    }
  }
}
</script>