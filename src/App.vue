<template>
    <div class="container">
        <app-header></app-header>
        <br><br>
        <transition name="slide" type="animation" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import Info from './components/Info.vue';
    export default {
        components: {
            'appHeader': Header,
        },
        created(){
            this.$store.dispatch('getFundsAction')
            this.$store.dispatch('getStocksAction')
        }

    }
</script>

<style>
    .slide-leave-active{
            animation: slide-out .5s ease-out forwards;
            transition: opacity .5s ease;
            opacity: 0;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0)
    }
    
    .slide-enter-active{
        animation: slide-in .5s ease-out forwards;
    }

    @keyframes slide-in {
        from {
        transform: translateY(-30px);
        }

        to {
        transform: translateY(0)
        }
    }

    @keyframes slide-out {
        from {
        transform: translateY(0);
        }

        to {
        transform: translateY(-30px)
        }
    }
</style>