<script>
    import {pb, user} from "./stores";

    let username;
    let password;
    let error;

    const login = async ()=>{
        try{
            await pb.collection('users').authWithPassword(username, password);
            user.set(pb.authStore.model);
        }
        catch(e){
            error = true;
            setTimeout(()=>{
                error = false;
            },5000)
        }
    }
</script>
{#if error}
    <div id="error">IDK something didn't work</div>
{/if}
<input style="margin-top:10px;" type="text" placeholder="Username" bind:value={username}>
<input type="text" placeholder="Password" bind:value={password}>
<button on:click={login}>Login</button>



<style>
    button{
        background-color: var(--blue) !important;
    }
    #error{
        background: var(--red);
        padding: 5px;
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        color:black;
    }
</style>