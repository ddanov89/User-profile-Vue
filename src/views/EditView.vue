<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'vue3-toastify';

const userStore = useProfileStore();
const route = useRoute();
const router = useRouter();

const userId = route.params.userId;

const form = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  company: { name: '' },
  address: { street: '', suite: '', city: '', zipcode: '' }
});

const errors = reactive({
  name: null,
  username: null,
  email: null,
  phone: null,
  website: null,
  companyName: null,
  street: null,
  suite: null,
  city: null,
  zipcode: null
});

const isSubmitting = ref(false);
const avatarUrl = ref('https://avatars.githubusercontent.com/u/583231?v=4');

// Validation functions
const required = (value) => (value && value.trim().length > 0 ? true : 'This field is required.');
const minLength = (value, len) => (value && value.length >= len ? true : `Minimum length is ${len}.`);

function validateField(fieldName, value) {
  switch (fieldName) {
    case 'name':
      errors.name = required(value) === true ? null : required(value);
      break;
    case 'username':
      errors.username = required(value) === true
        ? (minLength(value, 4) === true ? null : minLength(value, 4))
        : required(value);
      break;
    case 'email':
      errors.email = required(value) === true ? null : required(value);
      break;
    case 'phone':
      errors.phone = required(value) === true ? null : required(value);
      break;
    case 'website':
      errors.website = required(value) === true ? null : required(value);
      break;
    case 'companyName':
      errors.companyName = required(value) === true ? null : required(value);
      break;
    case 'street':
      errors.street = required(value) === true ? null : required(value);
      break;
    case 'suite':
      errors.suite = required(value) === true ? null : required(value);
      break;
    case 'city':
      errors.city = required(value) === true ? null : required(value);
      break;
    case 'zipcode':
      errors.zipcode = required(value) === true ? null : required(value);
      break;
  }
}

function validateForm() {
  validateField('name', form.name);
  validateField('username', form.username);
  validateField('email', form.email);
  validateField('phone', form.phone);
  validateField('website', form.website);
  validateField('companyName', form.company.name);
  validateField('street', form.address.street);
  validateField('suite', form.address.suite);
  validateField('city', form.address.city);
  validateField('zipcode', form.address.zipcode);

  return Object.values(errors).every(err => err === null);
}

function onInput(field, value) {
  switch (field) {
    case 'name': form.name = value; break;
    case 'username': form.username = value; break;
    case 'email': form.email = value; break;
    case 'phone': form.phone = value; break;
    case 'website': form.website = value; break;
    case 'companyName': form.company.name = value; break;
    case 'street': form.address.street = value; break;
    case 'suite': form.address.suite = value; break;
    case 'city': form.address.city = value; break;
    case 'zipcode': form.address.zipcode = value; break;
  }
  validateField(field, value);
}

function onImageChange(event) {
  const input = event.target;
  if (!input.files || !input.files[0]) return;

  const file = input.files[0];
  if (!file.type.startsWith('image/')) {
    toast.error('Please select a valid image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    avatarUrl.value = reader.result;
  };
  reader.onerror = () => {
   toast.error('There was an error uploading your image.');
  };
  reader.readAsDataURL(file);
}

async function editUser() {
  if (!validateForm()) {
    toast.error('Please fix validation errors.');
    return;
  }

  isSubmitting.value = true;

  const updatedProfile = {
    ...form,
    avatar: avatarUrl.value,
  };

  try {
    await userStore.updateUser(userId, updatedProfile);
    toast.success('User updated successfully!');
     setTimeout(() => {
    router.push(`/profile-page/${userId}`);
  }, 2000); 
  } catch (error) {
    console.error('Update failed:', error);
    toast.error('Failed to update user.');
  } finally {
    isSubmitting.value = false;
  }
}

// Populate form from store user by userId on mount
onMounted(() => {
  const user = userStore.getUserById(userId);
  if (user) {
    avatarUrl.value = user.avatar || avatarUrl.value;
    Object.assign(form, {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: { name: user.company?.name || '' },
      address: {
        street: user.address?.street || '',
        suite: user.address?.suite || '',
        city: user.address?.city || '',
        zipcode: user.address?.zipcode || '',
      }
    });
  } else {
    toast.error('User not found!');
    router.push('/404');
  }
});
</script>

<template>

  <main id="edit">
    <section id="edit-container">
      <div class="edit-container-info">
        <h1>Edit User</h1>
        <div v-if="isSubmitting" class="loader">Saving...</div>

        <form @submit.prevent="editUser" novalidate>
          <div class="avatar" @click="$refs.fileInput.click()">
            <img :src="avatarUrl" alt="avatar" />
            <div class="edit-icon"><i class="fas fa-edit"></i></div>
            <input type="file" ref="fileInput" style="display:none" @change="onImageChange" accept="image/*" />
          </div>

          <label for="name">Name:</label>
          <input id="name" type="text" :value="form.name" @input="onInput('name', $event.target.value)" />
          <p v-if="errors.name" class="errorContainer">{{ errors.name }}</p>

          <label for="website">Website:</label>
          <input id="website" type="text" :value="form.website" @input="onInput('website', $event.target.value)" />
          <p v-if="errors.website" class="errorContainer">{{ errors.website }}</p>

          <label for="username">Username:</label>
          <input id="username" type="text" :value="form.username" @input="onInput('username', $event.target.value)" />
          <p v-if="errors.username" class="errorContainer">{{ errors.username }}</p>

          <label for="email">Email:</label>
          <input id="email" type="email" :value="form.email" @input="onInput('email', $event.target.value)" />
          <p v-if="errors.email" class="errorContainer">{{ errors.email }}</p>

          <label for="phone">Phone:</label>
          <input id="phone" type="text" :value="form.phone" @input="onInput('phone', $event.target.value)" />
          <p v-if="errors.phone" class="errorContainer">{{ errors.phone }}</p>

          <div class="company-info-hidden">
            <label for="companyName">Company:</label>
            <input id="companyName" type="text" :value="form.company.name" @input="onInput('companyName', $event.target.value)" />
            <p v-if="errors.companyName" class="errorContainer">{{ errors.companyName }}</p>
          </div>

          <div class="address-group">
            <label for="street">Street:</label>
            <input id="street" type="text" :value="form.address.street" @input="onInput('street', $event.target.value)" />
            <p v-if="errors.street" class="errorContainer">{{ errors.street }}</p>

            <label for="suite">Suite:</label>
            <input id="suite" type="text" :value="form.address.suite" @input="onInput('suite', $event.target.value)" />

            <label for="city">City:</label>
            <input id="city" type="text" :value="form.address.city" @input="onInput('city', $event.target.value)" />
            <p v-if="errors.city" class="errorContainer">{{ errors.city }}</p>

            <label for="zipcode">Zipcode:</label>
            <input id="zipcode" type="text" :value="form.address.zipcode" @input="onInput('zipcode', $event.target.value)" />
            <p v-if="errors.zipcode" class="errorContainer">{{ errors.zipcode }}</p>
          </div>

          <input
            type="submit"
            id="btn"
            :disabled="Object.values(errors).some(e => e !== null) || isSubmitting"
            value="Save"
          />
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Your CSS unchanged */
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  color: #102a43;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-radius: 16px;
  z-index: 10;
}

#edit {
  width: 100%;
  max-width: 1400px;
  margin: 190px 0 0 0;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center; /* center vertically */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box; /* ensure padding doesn't affect width */
}

#edit-container {
  width: 100%;
  max-width: 600px;
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(4px);
}

/* Optional: make the form scrollable if screen is too small */
@media (max-height: 600px) {
  #edit {
    align-items: flex-start; /* don't vertically center on small height */
    padding-top: 2rem;
  }
}


h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #102a43;
  margin-bottom: 1.5rem;
  text-align: center;
}

.edit-container-info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #555;
}
input[type='text'],
input[type='email'] {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  margin-bottom: 0.8rem;
  border-radius: 10px;
  border: 1px solid #d9e2ec;
  background-color: #ffffff;
  font-size: 1rem;
  color: #102a43;
  box-shadow: 0 2px 4px rgba(16, 42, 67, 0.05);
  transition: all 0.2s ease-in-out;
}

input[type='text']:focus,
input[type='email']:focus {
  border-color: #3d83c2;
  box-shadow: 0 0 0 3px rgba(61, 131, 194, 0.2);
  outline: none;
}

label {
  font-weight: 700;
  font-size: 0.95rem;
  color: #334e68;
  margin-bottom: 0.3rem;
  display: block;
}

input#btn {
  margin-top: 1.8rem;
  width: 100%;
  padding: 0.75rem 1.2rem;
  background-color: #2a9d8f;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 1.05rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

input#btn:hover:enabled {
  background-color: #21867a;
}

input#btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.errorContainer {
  font-size: 0.8rem;
  color: #d64545;
  margin-top: -0.4rem;
  margin-bottom: 0.8rem;
}


.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem auto;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.05);
  border: 4px solid #fff;
  position: relative;
  cursor: pointer;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar img:hover {
  transform: scale(1.05);
}
.edit-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #3c7cf7;
  font-size: 1.5rem;
  background: white;
  border-radius: 50%;
  padding: 0.2rem 0.3rem;
}

.address-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.7rem 1.2rem;
  margin-top: 0.5rem;
}

.address-group label,
.address-group input {
  grid-column: span 2;
}

@media (max-width: 850px) {
  #edit-container {
    width: 80%;
  }

  .address-group {
    grid-template-columns: 1fr;
  }

  .address-group label,
  .address-group input {
    grid-column: span 1;
  }
}
</style>
