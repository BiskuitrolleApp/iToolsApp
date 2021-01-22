<template>
	<view class="wf-item-page">
		<image :src="item.image" mode="widthFix" class="item-img" />
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				require: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wf-item-page {
		background: #fff;
		overflow: hidden;
		border-radius: 5px;
	}

	.item-img {
		width: 100%;
	}

	.item-info {
		display: flex;
		align-items: center;
		padding: 5px;
	}

	.info-avatar {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.info-nickname {
		font-size: 12px;
		color: #333;
	}
</style>
