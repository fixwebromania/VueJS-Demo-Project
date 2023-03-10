<template>
  <div>
    <button v-on:click='show=!show' class='btn btn-primary btn-sm' style='float:right;'>{{ show ? 'Hide':'Show' }} Source</button>
    <ssh-pre :class='show ? "show-code" : "hide-code"' reactive language="js" class='mt-2'>{{ code }}</ssh-pre>
  </div>
</template>
<script>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'

export default 
{
  components:{SshPre},
  props: {
    url: String
  },
  mounted()
  {
    this.getSource(this.url)
  },
  data()
  {
    return {code:"",show:false}
  },
  methods:{
    getSource(url)
    {
      fetch(url).then((response) => response.text())
                .then((text) => { this.code=text })
                .catch(err=>
                {                  
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