<template>
    <div>
        <template v-if="v && v.$error">
            <span class="field-component__field-alert">reCaptcha manquant&nbsp;:</span>
            <span class="field-component__field-alert">Veuillez cocher la case "Je ne suis pas un robot"</span>
        </template>
    </div>
</template>

<script>
    if (typeof window !== 'undefined') {
        window.recaptchaLoaded = new Promise((resolve) => {
            window.vueRecaptchaInit = resolve
        });
        const recaptchaScript = document.createElement('script');
        recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaInit&render=explicit');
        recaptchaScript.setAttribute('async', '');
        recaptchaScript.setAttribute('defer', '');
        document.body.appendChild(recaptchaScript);
    }

    export default {
        name: "Recaptcha",
        props: {
            callback: Function,
            validate: Function,
            badge: String,
            type: String,
            errorCallback: Function,
            tabindex: String,
            size: String,
            v: {
                type: Object,
            },
        },
        data () {
            return {
                recaptchaId: 0,
            }
        },
        created () {
            if (typeof window === 'object') {
                return window.recaptchaLoaded.then(() => {
                    try {
                        const options = {
                            sitekey : process.env.VUE_APP_RECAPTCHA_SITE_KEY,
                        };
                        if (typeof this.badge !== 'undefined') options.badge = this.badge;
                        if (typeof this.type !== 'undefined') options.type = this.type;
                        if (typeof this.tabindex !== 'undefined') options.tabindex = this.dataTabidex;
                        if (typeof this.size === 'undefined') {
                            options.size = 'checkbox';
                            options.callback = this.getToken
                        }
                        const recaptchaDiv = document.createElement('div');
                        recaptchaDiv.className = 'g-recaptcha';
                        this.$el.insertBefore(recaptchaDiv, this.$el.childNodes[0]);
                        this.recaptchaId = window.grecaptcha.render(recaptchaDiv, options)
                    } catch (e) {
                        window.console.error(e)
                    }
                })
            }
        },
        methods: {
            submitData (event) {
                event.preventDefault();
                if (typeof window === 'undefined') return;
                if (this.validate() === true || typeof this.validate === 'undefined') {
                    if (typeof this.size === 'undefined') {
                        window.grecaptcha.execute(this.recaptchaId)
                    } else {
                        this.getToken(window.grecaptcha.getResponse(this.recaptchaId))
                    }
                }
            },
            getToken (token) {
                if (typeof window === 'undefined') return;
                this.recaptchaId = token;
                this.callback(token)
            }
        }
    }
</script>

<style scoped lang="scss">
    .field-component__field-alert {
        display: block;
        color: $color-7;
        margin-top: 0.3em;
        text-align: center;
    }
</style>