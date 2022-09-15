<template>
    <div class="navbar">
        <img src="@/assets/logo.png" alt="" class="logo">
        <div class="nav">
            <a href="https://menulab.com/">Home</a>
        </div>
    </div>
</template>

<style>
.navbar{
    height: var(--navbar-height);
    background-color: #fff;
    border-bottom: 1px solid rgb(181, 181, 181);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--container-px);
}
.navbar .logo{
    max-height: 65%;
}

.navbar .nav a{
    color: rgb(61, 61, 61);
    text-decoration: none;
    font-size: 1.1em;
    margin-left: 1em;
}
.navbar .nav a:hover{
    text-decoration: underline;
}

@media(max-width: 992px){
    .navbar .logo{
        max-height: 70%;
    }
}

@media(max-width: 576px){
    .navbar .logo{
        max-height: 80%;
    }
}
</style>