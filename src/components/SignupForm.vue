<template>
    <div class="modal-wrapper">
        <div class="modal-content">
            <i class="bi bi-x modal-close" @click="$emit('close')"></i>
            <p class="modal-title">Create a new account</p>

            <div class="input-group">
                <label>Email</label>
                <input v-model="email" type="email" placeholder="Type your email address" class="create-form-input">
            </div>
            <div class="input-group">
                <label>Password</label>
                <input v-model="password" type="password" placeholder="Type your password" class="create-form-input">
            </div>
            <div class="input-group">
                <label>Confirm</label>
                <input v-model="confirm" type="password" placeholder="Confirm your password" class="create-form-input">
            </div>

            <div class="modal-footer">
                <button class="btn txt" @click="$emit('close')">Cancel</button>
                <button class="btn" @click="signup">Sign up
                </button>
            </div>
        </div>
    </div>
</template>

<script>
 

export default {
    data: () => ({
        email: '',
        password: '',
        confirm: '', 
        auth: false,
    }),

    computed: {
    businessInfo() {
      return this.$store.state.businessInfo;
    },
  },

  mounted() {
    // this.auth = this.$route.query.auth; 
  }, 
     
    methods: {
        signup() {  
            if (!this.email) {
                this.$toast.error('Email is required');
                return;
            }
            if(this.validateEmail(this.email) === false) {
                this.$toast.error('Email is invalid');
                return;
            }

            if (!this.password) {
                this.$toast.error('Password is required');
                return;
            }
            if (!this.confirm) {
                this.$toast.error('Confirm is required');
                return;
            }
            if (this.password !== this.confirm) {
                this.$toast.error('Password and confirm password do not match');
                return;
            } 
            this.axios.post('http://127.0.0.1:8000/api/business-info', {
                email: this.email,
                password: this.password,
                data: this.businessInfo,
            })
            .then(response => {                
                if(response.data.status === 'success') {
                    this.$toast.success('Sign up successful');
                    this.$emit('close');
                    this.$store.dispatch('removeBusinessInfo');
                    // localStorage remove
                    localStorage.removeItem('v2store_business-info');

                    window.location.href = 'http://127.0.0.1:8000/login';
                }
            }) 
            .catch(error => {
                this.$toast.error(error.response.data.message);
            });
        },
        validateEmail(emailAdress) {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailAdress.match(regexEmail)) {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>