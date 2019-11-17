<template>
    <div>
        <div v-if="name === 'admin'" class="system">
            <p class="text-xs-center">{{ text }}</p>
        </div>
        <div v-else>
            <div class="mes" :class="{owner}">
                <small><strong> {{ name }}</strong></small>
                <p>{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        text: String,
        owner: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="stylus">
    .system {
        margin-bottom 1rem; 

        p {
            margin-bottom 1rem;
        }
    }

    .wrap {
        display flex;
        flex-direction: column;
    }

    .mes {
        padding 1rem;
        width: 60%;
        margin: 1rem;
        box-shadow: 0 1px 0 0 rgba(50, 50, 50, .3);
        border-radius: 4px;
        background: #1976d2;
        margin-bottom 1rem;
        
        p {
            margin-bottom 0;
        }
    }

    .owner {
        background: #fff;
        color: #000000;
        align-self: flex-end;
    }

</style>