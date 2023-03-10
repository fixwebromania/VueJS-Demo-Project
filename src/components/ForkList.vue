<template>
	<div class="fork" v-if="forks.length">
		Forked by:
		<div :class='show||index<2 ? "show-fork" : "hide-fork"' class="user d-inline" v-bind:key="index" v-for="(fork,index) in forks">
				<img class='rounded-circle d-inline float-left' :src="fork.owner.avatar_url">
				<div class='username d-inline'>{{ fork.owner.login }}</div>
		</div>
		<button v-on:click='show=!show' class='btn btn-primary btn-sm'>{{ show ? 'Hide':'More' }}</button>
	</div>
</template>
<script>
export default
{
  props: {
    url: String
  },
  data()
  {
	return {forks:[],show:false}
  },
  mounted()
  {
	this.getForks(this.url);
  },
  methods:
  {
		getForks(url)
		{
		fetch(url,{
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
									this.forks=json
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