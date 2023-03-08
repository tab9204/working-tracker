<div class="loading">
    <div class="circle pulse"></div>
    <div class="circle pulse"></div>
    <div class="circle pulse"></div>
</div>

<style>
    .loading{
        position: relative;
        transform: translate(-50%,-50%);
        left: 50%;
        top: 50%;
        height: 100px;
        width: 100px;
    }

    .circle{
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background:var(--blue);
        transform: scale(0);
        
    }

    .loading div:nth-child(2){
        animation-delay: 0.1s;
    }
    .loading  div:nth-child(3){
        animation-delay: 0.2s;
    }

    .pulse{
        animation: pulse 1s;
        animation-iteration-count: infinite;
    }
    @keyframes pulse {
        0% {
            transform: scale(0);
        }
        80% {
            transform: scale(1);
        }
        100%{
            opacity: 0;
        }
    }
</style>