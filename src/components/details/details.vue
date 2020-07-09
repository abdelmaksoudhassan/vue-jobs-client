<template>
    <div>
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
            <h3 class="uk-card-title"><slot name="head"></slot></h3>
            <p><slot name="body"></slot></p>
        </div>
    </div>
</template>
<style scoped>
.uk-card{
    margin: 20px 0px;
}
</style>