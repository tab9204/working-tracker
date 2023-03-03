<script>
    import {pb, user} from "./pocketbase";

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
            },4000)
        }
    }
</script>
{#if error}
    <div id="error">IDK something didn't work</div>
{/if}
<input type="text" placeholder="Username" bind:value={username}>
<input type="text" placeholder="Password" bind:value={password}>
<button on:click={login}>Login</button>


<style>
    #error{
        background: var(--red);
        padding: 5px;
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
</style>