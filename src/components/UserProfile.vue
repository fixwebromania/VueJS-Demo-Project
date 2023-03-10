<template>
<div class="user-profile" v-if="user">
<img class="rounded-circle w-50" :src="user.avatar_url">
    <div class='user-info'>
        <div class='name'>{{user.name}}</div>
        <div class='login'>{{user.login}}</div>
        <div class='bio'>{{user.bio}}</div>
    </div>
</div>
</template>
<script>
export default 
{
  props:["user"]
}
</script>