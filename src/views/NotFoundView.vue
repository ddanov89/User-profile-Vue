<template>
    <div class="not-found">
        <h5>Page not found!</h5>
        <img src="/gst_bg_054_07_1.svg" alt="404" />
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style scoped>
.not-found {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
    margin: 42px auto 232px auto;
}

.not-found img {
    width: 45%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.not-found h5 {
    margin: 0;
    font-size: 38px;
    font-weight: 600;
    line-height: 150%;
}

@media (max-width: 744px) {
    .not-found {
        margin: 40px auto 132px auto;
        gap: 96px;
    }

    .not-found img {
        width: 68%;
    }

    .not-found h5 {
        font-size: 32px;
        font-weight: 500;
    }
}

@media (max-width: 470px) {
    .not-found {
        margin: 64px auto 108px auto;
        gap: 66px;
    }

    .not-found img {
        width: 65%;
    }

    .not-found h5 {
        font-size: 24px;
    }
}
</style>
