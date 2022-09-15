<script>
import salon1 from '@/assets/banners/salon.jpg'
import salon2 from '@/assets/banners/salon 2.jpg'
import salon3 from '@/assets/banners/salon3.jpg'

import spa1 from '@/assets/banners/spa.jpg'
import spa2 from '@/assets/banners/spa (2).jpg'
import spa3 from '@/assets/banners/spa3.jpg'

import salonSpa1 from '@/assets/banners/salon and spa.jpg'

import gym1 from '@/assets/banners/gym.jpg'
import gym2 from '@/assets/banners/gym2.jpg'
import gym3 from '@/assets/banners/gym3.jpg'
import gym4 from '@/assets/banners/gym4.jpg'

import doctor1 from '@/assets/banners/doctor.jpg'
import doctor2 from '@/assets/banners/doctor2.jpg'
import doctor3 from '@/assets/banners/doctor3.jpg'
import doctor4 from '@/assets/banners/doctor4.jpg'



// const banners = {
//     "Cafe": [
//         restaurant1,
//         restaurant2,
//         restaurant3
//     ],
//     "Restaurant": [
//         restaurant1,
//         restaurant2,
//         restaurant3
//     ],
//     "Pub": [
//         bar1,
//         hotel2andbar2
//     ],
//     "In-room dining": [
//         hotel1,
//         hotel2andbar2
//     ],
//     "Honesty Bar": [
//         bar1,
//         hotel2andbar2
//     ]
// }

const banners = {
    "Salon": [
        salon1,
        salon2,
        salon3,
        salonSpa1
    ],
    "Spa/Masseuse": [
        spa1,
        spa2,
        spa3,
        salonSpa1
    ],
    "Gym/PT": [
        gym1,
        gym2,
        gym3,
        gym4
    ],
    "Doctors Surgery": [
        doctor1,
        doctor2,
        doctor3,
        doctor4
    ]
}

export default {
    mounted(){
        this.emitBanner()
    },
    methods: {
        emitBanner(){
            const cat = this.$store.state.businessInfo.type
            if(!banners[cat]) return
            let bannerIdx = this.$store.state.businessInfo.bannerIdx || 0
            if(bannerIdx != -1){
                this.$store.state.businessInfo.banner =  banners[cat][0]
            }
            this.$emit('bannerImgs', {
                img: banners[cat],
                idx: bannerIdx
            })
        }
    }
}
</script>