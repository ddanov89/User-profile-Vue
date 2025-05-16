<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore'
import { toast } from 'vue3-toastify';

const route = useRoute()
const router = useRouter()
const profileStore = useProfileStore()

const defaultAvatarUrl = 'https://avatars.githubusercontent.com/u/583231?v=4'
const userId = route.params.userId
const selectedUser = ref(null)

onMounted(async () => {
  let user = profileStore.getUserById(userId)

  if (!user) {
    await profileStore.fetchAllUsers()
    user = profileStore.getUserById(userId)
  }

  if (user) {
    selectedUser.value = user
  } else {
    router.push('/404')
  }
})

function launchEditForm() {
  if (selectedUser.value?.id) {
    router.push(`/edit/${selectedUser.value.id}`)
  } else {
    toast.error('Action not allowed')
  }
}
</script>

<template>
  <section id="profile">

    <div class="background-overlay"></div>

    <div class="primary-section" v-if="selectedUser">
      <div class="avatar">
        <img :src="selectedUser.avatar || defaultAvatarUrl" alt="avatar" />
      </div>

      <div class="personal-information">
        <div class="name">{{ selectedUser.name }}</div>
        <div class="website">{{ selectedUser.website }}</div>

        <div class="button">
          <button type="button" class="edit" @click="launchEditForm">
            Edit
          </button>
        </div>
      </div>
    </div>

    <div class="secondary-section" v-if="selectedUser">
      <div class="digital-information">
        <div class="section-label">Digital Information</div>

        <div class="info-row">
          <div class="name-label">Name</div>
          <div class="name">{{ selectedUser.name }}</div>
        </div>
        <div class="info-row">
          <div class="username-label">Username</div>
          <div class="username">{{ selectedUser.username }}</div>
        </div>
        <div class="info-row">
          <div class="email-label">Email</div>
          <div class="email">{{ selectedUser.email }}</div>
        </div>
        <div class="info-row">
          <div class="phone-label">Phone</div>
          <div class="phone">{{ selectedUser.phone }}</div>
        </div>
        <div class="info-row">
          <div class="company-label">Company</div>
          <div class="company">{{ selectedUser.company.name }}</div>
        </div>
      </div>

      <div class="address-information">
        <div class="section-label">Address</div>

        <div class="info-row">
          <div class="address-label">Street</div>
          <div class="street">{{ selectedUser.address.street }}</div>
        </div>
        <div class="info-row">
          <div class="address-label">Suite</div>
          <div class="suite">{{ selectedUser.address.suite }}</div>
        </div>
        <div class="info-row">
          <div class="address-label">City</div>
          <div class="city">{{ selectedUser.address.city }}</div>
        </div>
        <div class="info-row">
          <div class="address-label">Zip Code</div>
          <div class="zipcode">{{ selectedUser.address.zipcode }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>

#profile {
  width: 100%;
  margin: 8em auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
}

.avatar img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.avatar img:hover {
  transform: scale(0.5);
}

.section-label {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.primary-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.personal-information .name {
  font-size: 26px;
  font-weight: 700;
  margin-top: 1rem;
  color: #102a43;
}

.personal-information .website {
  font-size: 16px;
  color: #3d83c2;
}

.button .edit {
  background-color: #2a9d8f;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.button .edit:hover {
  background-color: #21867a;
}

.secondary-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.digital-information,
.address-information {
  flex: 1 1 45%;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.digital-information > div,
.address-information .street-information > div {
  margin-bottom: 0.8rem;
}

.digital-information {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row > div {
  font-size: 15px;
  color: #102a43;
}

.info-row > div:first-child {
  font-weight: 600;
  color: #334e68;
}

.name-label,
.username-label,
.email-label,
.phone-label,
.company-label,
.address-label {
  font-weight: 600;
  color: #334e68;
}

.address-information {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.address-label {
  font-weight: 600;
  color: #334e68;
  min-width: 100px;
}

.street,
.suite,
.city,
.zipcode {
  color: #102a43;
  font-size: 15px;
  text-align: right;
}

.name,
.username,
.email,
.phone,
.company {
  color: #102a43;
  font-size: 15px;
}

@media (max-width: 768px) {
  .secondary-section {
    flex-direction: column;
  }

  .digital-information,
  .address-information {
    flex: 1 1 100%;
  }

  .address-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }

  .address-full {
    text-align: left;
    max-width: 100%;
  }

  .avatar img {
    width: 120px;
    height: 120px;
  }

  .personal-information .name {
    font-size: 22px;
  }
}
</style>
