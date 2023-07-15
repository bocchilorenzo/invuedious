<template>
	<div v-if="loading" class="loading loading-lg"></div>
	<div v-else>
		<div v-if="failed">
			<div class="empty">
				<div class="empty-icon">
					<unicon
						name="sad-dizzy"
						fill="var(--primary)"
						width="50px"
						height="50px"
					/>
				</div>
				<p class="empty-title h5">Connection error</p>
				<p class="empty-subtitle">
					The request to the indvidious instance took too long, or the
					channel doesn't exist.
					<br />Check your connection and try again.
				</p>
				<div class="empty-action">
					<button class="btn btn-primary" @click="reconnect()">
						RETRY
					</button>
				</div>
			</div>
		</div>
		<channelHeader :dataArray="dataArray" />
		<ul class="tab tab-block">
			<li class="tab-item" id="tab1" @click="setActive(1)">
				<router-link
					:to="{
						name: 'channel',
					}"
				>
					<unicon name="video" fill="var(--primary)" />VIDEOS
				</router-link>
			</li>
			<li class="tab-item" id="tab2" @click="setActive(2)">
				<router-link
					:to="{
						name: 'channel',
					}"
				>
					<unicon name="tv-retro" fill="var(--primary)" />CHANNELS
				</router-link>
			</li>
			<li class="tab-item" id="tab3" @click="setActive(3)">
				<router-link
					:to="{
						name: 'channel',
					}"
				>
					<unicon name="info-circle" fill="var(--primary)" />ABOUT
				</router-link>
			</li>
		</ul>
		<div>
			<div class="container2" v-if="mode == 'videos'">
				<div v-if="dataArray[0].latestVideos.length != 0">
					<cardContainer :videoArray="dataArray[0].latestVideos" />
				</div>
				<div v-else>
					<div class="empty">
						<div class="empty-icon">
							<unicon
								name="image-times"
								fill="var(--primary)"
								width="50px"
								height="50px"
							/>
						</div>
						<p class="empty-title h5">No videos found</p>
					</div>
				</div>
			</div>
			<div class="container2" v-else>
				<div v-if="mode == 'channels'">
					<roundedCardContainer
						:dataArray="dataArray[0].relatedChannels"
						:mode="'channelInfo'"
						v-if="dataArray[0].relatedChannels.length != 0"
					/>
					<div v-else>
						<div class="empty">
							<div class="empty-icon">
								<unicon
									name="tv-retro-slash"
									fill="var(--primary)"
									width="50px"
									height="50px"
								/>
							</div>
							<p class="empty-title h5">No related channels</p>
						</div>
					</div>
				</div>
				<div v-else id="channelDescription">
					<div
						v-html="dataArray[0].descriptionHtml"
						id="descriptionText"
					></div>
					<div>
						<p>
							Joined:
							<span style="color: white">{{
								dataArray[0].dateJoined
							}}</span>
						</p>
						<p>{{ dataArray[0].formattedViews }}</p>
						<p>{{ dataArray[0].formattedSubs }} subscribers</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
var numeral = require("numeral")
import cardContainer from "../components/cardContainer.vue"
import roundedCardContainer from "../components/roundedCardContainer.vue"
import channelHeader from "../components/channelHeader.vue"
export default {
	name: "channelPage",
	data() {
		return {
			loading: true,
			mode: "videos",
			dataArray: [],
			id: this.$route.params.id,
			failed: false,
		}
	},
	props: {
		reload: Boolean,
	},
	components: {
		cardContainer,
		roundedCardContainer,
		channelHeader,
	},
	created() {
		this.getChannelData()
	},
	methods: {
		reconnect() {
			this.loading = true
			this.mode = "videos"
			this.dataArray = []
			this.failed = false
			this.getChannelData()
		},
		getChannelData() {
			var url = this.$store.state.selected + "/api/v1/channels/" + this.id
			axios({
				url: url,
				timeout: 10000,
			})
				.then((response) => {
					document.title = response.data.author + " - Invuedious"
					let tmpObj = {}
					tmpObj = response.data
					tmpObj.formattedSubs = numeral(
						response.data.subCount
					).format("0a")
					if (
						tmpObj.formattedSubs.charAt(
							tmpObj.formattedSubs.length - 1
						) == "m"
					) {
						var strtmp =
							tmpObj.formattedSubs.substr(
								0,
								tmpObj.formattedSubs.length - 1
							) + "M"
						tmpObj.formattedSubs = strtmp
					}
					tmpObj.dateJoined = this.timeConverter(response.data.joined)
					tmpObj.formattedViews = response.data.totalViews + " views"
					this.dataArray.push(tmpObj)
				})
				.catch(() => {
					this.failed = true
				})
				.then(() => (this.loading = false))
				.then(() => this.setActive(1))
		},
		timeConverter(tmp) {
			var a = new Date(tmp * 1000)
			var year = a.getFullYear()
			var month =
				a.getMonth() + 1 < 10
					? "0" + (a.getMonth() + 1)
					: a.getMonth() + 1
			var date = a.getDate() < 10 ? "0" + a.getDate() : a.getDate()
			var time = month + "-" + date + "-" + year
			return time
		},
		setActive(tab) {
			if (tab == 1) {
				if (this.mode != "videos") {
					this.mode = "videos"
				}
				document.getElementById("tab1").classList.add("active")
				document.getElementById("tab2").classList.remove("active")
				document.getElementById("tab3").classList.remove("active")
			} else if (tab == 2) {
				if (this.mode != "channels") {
					this.mode = "channels"
				}
				document.getElementById("tab2").classList.add("active")
				document.getElementById("tab1").classList.remove("active")
				document.getElementById("tab3").classList.remove("active")
			} else {
				if (this.mode != "about") {
					this.mode = "about"
				}
				document.getElementById("tab3").classList.add("active")
				document.getElementById("tab2").classList.remove("active")
				document.getElementById("tab1").classList.remove("active")
			}
		},
	},
	watch: {
		reload() {
			if (this.reload) {
				this.reconnect()
			}
		},
	},
}
</script>

<style scoped>
p {
	color: var(--secondary);
}
#descriptionText {
	color: white;
}
</style>
