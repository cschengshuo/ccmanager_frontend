<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem label="记住我" prop="remember">
                            <i-switch v-model="form.remember" size="small"></i-switch>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
        <div id="indexLizi"></div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import qs from 'qs'
import THREE from '../libs/three/three'

export default {
    data () {
        return {
            form: {
                userName: '',
                password: '',
                remember: false
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let data = {
                        username: this.form.userName,
                        password: this.form.password
                    }
                    this.$http.post('/api/login', qs.stringify(data))
                        .then(function (response) {
                            console.log(response)
                            Cookies.set('user', this.form.userName)
                            this.$router.push('/')
                        })
                    // Cookies.set('password', this.form.password)
                    // this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg')
                    // if (this.form.userName === 'iview_admin') {
                    //     Cookies.set('access', 0)
                    // } else {
                    //     Cookies.set('access', 1)
                    // }
                }
            })
        },
        initAnimation () {
            let SCREEN_WIDTH = window.innerWidth
            let SCREEN_HEIGHT = window.innerHeight

            let SEPARATION = 90
            let AMOUNTX = 50
            let AMOUNTY = 50

            let container

            let particles, particle
            let count

            let camera
            let scene
            let renderer

            let mouseX = 0

            let windowHalfX = window.innerWidth / 2

            init()
            this.interval = setInterval(loop, 1000 / 60)

            function init () {
                container = document.createElement('div')
                container.style.position = 'relative'
                container.style.top = '200px'
                document.getElementById('indexLizi').appendChild(container)

                camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
                camera.position.z = 1000

                scene = new THREE.Scene()

                renderer = new THREE.CanvasRenderer()
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

                particles = []

                let i = 0
                let material = new THREE.ParticleCircleMaterial(0x097bdb, 1)

                for (let ix = 0; ix < AMOUNTX; ix++) {
                    for (let iy = 0; iy < AMOUNTY; iy++) {
                        particle = particles[i++] = new THREE.Particle(material)
                        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
                        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
                        scene.add(particle)
                    }
                }

                count = 0

                container.appendChild(renderer.domElement)

                document.addEventListener('mousemove', onDocumentMouseMove, false)
            }

            function onDocumentMouseMove (event) {
                mouseX = event.clientX - windowHalfX
            }

            function loop () {
                camera.position.x += (mouseX - camera.position.x) * 0.05
                camera.position.y = 364

                var i = 0

                for (var ix = 0; ix < AMOUNTX; ix++) {
                    for (var iy = 0; iy < AMOUNTY; iy++) {
                        particle = particles[i++]
                        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
                        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
                    }
                }

                renderer.render(scene, camera)

                count += 0.1
            }
        }
    },
    mounted () {
        // this.initAnimation()
    }
}
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg-new.png");
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    z-index: 3;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
#indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
