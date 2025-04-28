<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import { ref } from 'vue';

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', contactForm.value);
};

const contactInfo = [
  {
    icon: '📞',
    title: 'Phone',
    content: '+1 (555) 123-4567',
    action: 'Call now'
  },
  {
    icon: '✉️',
    title: 'Email',
    content: 'support@gostock.com',
    action: 'Send email'
  },
  {
    icon: '🌍',
    title: 'Address',
    content: '123 Trading Street, Market City, ST 12345',
    action: 'Get directions'
  }
];
</script>

<template>
  <div class="contact">
    <TopBar />
    
    <div class="main-content">
      <div class="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our support team for any questions or concerns.</p>
      </div>
      
      <div class="contact-container">
        <div class="contact-info">
          <div v-for="info in contactInfo" :key="info.title" class="info-card">
            <span class="info-icon">{{ info.icon }}</span>
            <div class="info-content">
              <h3>{{ info.title }}</h3>
              <p>{{ info.content }}</p>
              <a href="#" class="info-action">{{ info.action }}</a>
            </div>
          </div>
        </div>
        
        <div class="contact-form-container">
          <div class="card">
            <div class="card-header">
              <h2>Send us a message</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    v-model="contactForm.name" 
                    class="form-control" 
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    v-model="contactForm.email" 
                    class="form-control" 
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label>Subject</label>
                  <input 
                    type="text" 
                    v-model="contactForm.subject" 
                    class="form-control" 
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label>Message</label>
                  <textarea 
                    v-model="contactForm.message" 
                    class="form-control" 
                    rows="5" 
                    required
                  ></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.contact-header p {
  color: #858796;
  font-size: 1.1rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: var(--box-shadow);
}

.info-icon {
  font-size: 1.5rem;
  background-color: rgba(78, 115, 223, 0.1);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.info-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.info-content p {
  color: #858796;
  margin-bottom: 0.5rem;
}

.info-action {
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 600;
}

.contact-form-container {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #d1d3e2;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

@media screen and (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    order: 2;
  }
  
  .contact-form-container {
    order: 1;
  }
}
</style>