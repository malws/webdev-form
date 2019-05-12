let confirmation = Vue.component('confirmation', {
    props: [
        'customerName',
        'emailAddress',
        'enquiry',
        'response',
        'animDone'
    ],
    template: `
        <div id="confirmation">
            <transition name="notification"><div class="notification" v-if="animDone"><span class="i">i</span>{{response}}</div></transition>
            <div class="confirm-data">{{customerName}}</div>
            <div class="confirm-data">{{emailAddress}}</div>
            <div class="confirm-data confirm-enquiry">{{enquiry}}</div>
            <button class="go-back" @click="goBack">Go back</div>
        </div>`,
    methods: {
        goBack: function () {
            this.$emit('customer-name', '')
            this.$emit('email-address', '')                    
            this.$emit('enquiry', '')
            this.$emit('response', '')            
            this.$emit('anim-done', false)
            this.$router.push('/')
        }
    }
})

let form = Vue.component('form', {
    props: [
        'customerName',
        'emailAddress',
        'enquiry',
        'response'
    ],

    data() {
        return {
            submit: false
        }
    },

    computed: {
        emptyName: function () { return this.customerName === ''; },
        emptyEnquiry: function () { return this.enquiry === ''; },
        emptyEmail: function () { 
            let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/     
            return ( this.emailAddress === '' || !(this.emailAddress.match(regexp)));
        },
    },
    
    methods: {
        validate: function(event) {
            this.submit = true;
            if (this.emptyName || this.emptyEnquiry || this.emptyEmail ) {
                event.preventDefault();
            }
            else {
                this.sendIdentity();
            }
        },
        sendIdentity: function() {
            let self = this
            axios.post('php/handler.php',{ customerName: this.customerName, emailAddress: this.emailAddress, enquiry: this.enquiry })
            .then(function(response){
                const status = JSON.parse(response.status)
                if (status == '200') {
                    self.response = 'Thank you. We will contact you soon.'
                    self.$emit('customer-name', self.customerName)
                    self.$emit('email-address', self.emailAddress)                    
                    self.$emit('enquiry', self.enquiry)
                    self.$emit('response', self.response)
                    self.$router.push('confirmation')
                }
            }).catch(function (error) {
                self.response = 'Failed to send! Try again.'
                console.log(error);
            }); 
        }
    },  
    template: `
    <form id="contact-form" method="post" v-on:submit.prevent="validate">
        <div class="form-element">
            <input id="name" type="text" v-model='customerName' placeholder="Name" :class="{ error: submit && emptyName }" maxlength="50">
            <transition name="message" mode="out-in"><span class="alert" v-if="submit && emptyName">This field is required.</span></transition>
        </div>
        <div class="form-element">
            <input id="email" type="text" v-model="emailAddress" placeholder="E-mail" :class="{ error: submit && emptyEmail }">
            <transition name="message" mode="out-in"><span class="alert" v-if="submit && emptyEmail">Enter a valid e-mail address.</span></transition>
        <div>
        <div class="form-element">
            <textarea id="enquiry" v-model="enquiry" placeholder="Enquiry" :class="{ error: submit && emptyEnquiry }"/>
            <transition name="message" mode="out-in"><span class="alert" v-if="submit && emptyEnquiry">This field is required.</span></transition>
        </div>
        <div class="form-element">
            <input type="submit" class="submit-button" value="Submit"/>
        </div>
    </form>
    `
})


let vm = new Vue({
    router: new VueRouter({
        routes: [
          { path: '/', name: 'contactForm', component: form },
          { path: '/confirmation', name: 'confirmation', component: confirmation }
        ]
    }),
    data: {        
        customerName: '',
        emailAddress: '',
        enquiry: '',
        response: '',
        animDone: false
    },
    el: "#app",
    methods: {
        afterEnter: function() {
            if (this.$router.currentRoute.path == '/confirmation') this.animDone = true
        }
    }
});
