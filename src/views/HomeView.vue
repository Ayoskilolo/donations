<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors duration-300">
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <!-- Navigation Header -->
      <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <HeartIcon class="h-8 w-8 text-primary-orange" />
              <h1 class="text-2xl font-bold text-primary-red">DonateTracker</h1>
            </div>
            <div class="flex items-center space-x-2">
              
              <!-- Dark Mode Toggle -->
              <button
                @click="toggleDarkMode"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Toggle dark mode"
              >
                <SunIcon v-if="isDarkMode" class="h-5 w-5" />
                <MoonIcon v-else class="h-5 w-5" />
              </button>
              
              <!-- Admin Button -->
              <button
                @click="currentPage = isAuthenticated ? 'admin' : 'login'"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Admin Dashboard"
              >
                <SettingsIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <button
                v-if="currentPage !== 'donate'"
                @click="currentPage = 'donate'"
                class="bg-primary-orange hover:bg-primary-orange/90 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Donate Now
              </button>
              
              <button
                v-if="currentPage !== 'home'"
                @click="currentPage = 'home'"
                class="text-primary-red hover:text-primary-red/80 px-4 py-2 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main>
        <!-- Home Page -->
        <div v-if="currentPage === 'home'" class="container mx-auto px-4 py-8">
          <!-- Hero Section -->
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-6xl font-bold text-primary-red mb-4">{{ campaign.title }}</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ campaign.description }}</p>
          </div>

          <!-- Themed Illustration -->
          <div class="flex justify-center mb-12">
            <DonationIllustration class="w-64 h-48" />
          </div>

          <!-- Progress Section -->
          <div class="mb-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div class="bg-gradient-to-r from-primary-red to-primary-red/80 text-white p-6">
                <h3 class="text-2xl font-bold flex items-center text-white">
                  <TargetIcon class="mr-2 h-6 w-6" />
                  Campaign Progress
                </h3>
                <p class="text-white/90">Track our journey towards the goal</p>
              </div>
              <div class="p-8">
                <div class="space-y-6">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-3xl font-bold text-primary-red">{{ formatCurrency(campaign.currentAmount) }}</p>
                      <p class="text-gray-600 dark:text-gray-400">raised</p>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-semibold text-primary-orange">{{ formatCurrency(campaign.targetAmount) }}</p>
                      <p class="text-gray-600 dark:text-gray-400">goal</p>
                    </div>
                  </div>

                  <!-- Enhanced Animated Progress Bar -->
                  <div class="space-y-3">
                    <div class="relative w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                      <!-- Background wave animation -->
                      <div class="absolute inset-0 opacity-30">
                        <div class="wave-animation h-full w-full"></div>
                      </div>
                      
                      <!-- Main progress fill -->
                      <div 
                        class="progress-fill h-full rounded-full relative overflow-hidden transition-all duration-2000 ease-out"
                        :style="{ width: `${Math.min(progressPercentage, 100)}%` }"
                      >
                        <!-- Gradient fill -->
                        <div class="absolute inset-0 bg-gradient-to-r from-primary-red via-primary-orange to-primary-red"></div>
                        
                        <!-- Animated shine effect -->
                        <div class="absolute inset-0 shine-animation"></div>
                        
                        <!-- Wave overlay -->
                        <div class="absolute inset-0 wave-overlay"></div>
                      </div>
                      
                      <!-- Progress indicator dot -->
                      <div 
                        class="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary-orange rounded-full shadow-lg transition-all duration-2000 ease-out pulse-animation"
                        :style="{ left: `calc(${Math.min(progressPercentage, 100)}% - 8px)` }"
                      ></div>
                    </div>
                    
                    <!-- Progress text with animation -->
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">
                        <span class="progress-counter">{{ progressPercentage.toFixed(1) }}</span>% complete
                      </span>
                      <span class="text-gray-700 dark:text-gray-300 font-medium">
                        {{ formatCurrency(remainingAmount) }} remaining
                      </span>
                    </div>
                    
                    <!-- Milestone markers -->
                    <div class="relative w-full h-2">
                      <div 
                        v-for="milestone in [25, 50, 75]" 
                        :key="milestone"
                        class="absolute top-0 w-0.5 h-2 bg-gray-400 dark:bg-gray-500"
                        :style="{ left: `${milestone}%` }"
                      >
                        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400">
                          {{ milestone }}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Stats cards -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                      <UsersIcon class="h-8 w-8 text-primary-red mx-auto mb-2" />
                      <p class="text-2xl font-bold text-primary-red">{{ campaign.donations.length.toLocaleString() }}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Donors</p>
                    </div>
                    <div class="text-center p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                      <TrendingUpIcon class="h-8 w-8 text-primary-orange mx-auto mb-2" />
                      <p class="text-2xl font-bold text-primary-orange">
                        {{ formatCurrency(Math.round(campaign.currentAmount / campaign.donations.length)) }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Avg. Donation</p>
                    </div>
                    <div class="text-center p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                      <HeartIcon class="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p class="text-2xl font-bold text-green-600">{{ daysActive.toLocaleString() }}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Donations -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-xl font-bold text-primary-red">Recent Donations</h3>
              <p class="text-gray-600 dark:text-gray-400">Latest contributions from our amazing supporters</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div 
                  v-for="donation in campaign.donations.slice(0, 5)" 
                  :key="donation.id"
                  class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-primary-red rounded-full flex items-center justify-center">
                      <HeartIcon class="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p class="font-semibold text-primary-red">{{ donation.donorName }}</p>
                      <p v-if="donation.message" class="text-sm text-gray-600 dark:text-gray-400">"{{ donation.message }}"</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500">{{ formatDate(donation.timestamp) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-primary-orange">{{ formatCurrency(donation.amount) }}</p>
                    <span v-if="donation.verified" class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="text-center mt-12 p-8 bg-gradient-to-r from-primary-red to-primary-red/80 rounded-2xl text-white">
            <h3 class="text-3xl font-bold mb-4">Join Our Mission</h3>
            <p class="text-xl mb-6 text-red-100">Every contribution makes a difference. Be part of the change.</p>
            <button
              @click="currentPage = 'donate'"
              class="bg-primary-orange hover:bg-primary-orange/90 text-white font-bold px-8 py-3 text-lg rounded-lg transition-colors"
            >
              Make a Donation
            </button>
          </div>
        </div>

        <!-- Donate Page -->
        <div v-if="currentPage === 'donate'" class="container mx-auto px-4 py-8">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-primary-red mb-4">Make a Donation</h1>
              <p class="text-gray-600 dark:text-gray-400">Your contribution will make a real difference</p>
            </div>

            <!-- Themed Illustration -->
            <div class="flex justify-center mb-8">
              <GivingIllustration class="w-48 h-36" />
            </div>

            <!-- Progress Steps -->
            <div class="flex justify-center mb-8">
              <div class="flex items-center space-x-4">
                <div v-for="stepNum in [1, 2, 3]" :key="stepNum" class="flex items-center">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                      donationStep >= stepNum ? 'bg-primary-red text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    ]"
                  >
                    {{ stepNum }}
                  </div>
                  <div 
                    v-if="stepNum < 3"
                    :class="[
                      'w-12 h-1 mx-2',
                      donationStep > stepNum ? 'bg-primary-red' : 'bg-gray-200 dark:bg-gray-700'
                    ]"
                  />
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-bold text-primary-red">
                  {{ donationStep === 1 ? 'Donation Details' : donationStep === 2 ? 'Upload Proof' : 'Receipt Generated' }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ donationStep === 1 ? 'Enter your donation information' : donationStep === 2 ? 'Upload proof of your transfer' : 'Your donation has been recorded' }}
                </p>
              </div>
              <div class="p-6 space-y-6">
                <!-- Step 1: Donation Details -->
                <div v-if="donationStep === 1" class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Donation Amount ({{ currencySymbol }})</label>
                      <input
                        v-model="donationForm.amount"
                        type="number"
                        :placeholder="campaign.currency === 'NGN' ? '50000' : campaign.currency === 'USD' ? '100' : '80'"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        v-model="donationForm.donorName"
                        placeholder="John Doe"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      v-model="donationForm.email"
                      type="email"
                      placeholder="john@example.com"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Message (Optional)</label>
                    <textarea
                      v-model="donationForm.message"
                      placeholder="Share why you're supporting this cause..."
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                    ></textarea>
                  </div>
                  <div class="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 class="font-semibold text-primary-red mb-2">Transfer Details</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Please transfer your donation to:</p>
                    <div class="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                      <p class="font-mono text-sm">
                        <strong>Account:</strong> {{ getBankDetails().account }}<br />
                        <strong>Bank:</strong> {{ getBankDetails().bank }}<br />
                        <strong>Reference:</strong> DONATION-{{ Date.now() }}
                      </p>
                    </div>
                  </div>
                  <button
                    @click="donationStep = 2"
                    :disabled="!donationForm.amount || !donationForm.donorName || !donationForm.email"
                    class="w-full bg-primary-red hover:bg-primary-red/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                  >
                    Continue to Upload Proof
                  </button>
                </div>

                <!-- Step 2: Upload Proof -->
                <div v-if="donationStep === 2" class="space-y-4">
                  <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <UploadIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p class="text-lg font-semibold mb-2">Upload Transfer Proof</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">Upload a screenshot or photo of your transfer receipt</p>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleFileUpload"
                      class="hidden"
                      ref="fileInput"
                    />
                    <button
                      @click="$refs.fileInput.click()"
                      class="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Choose File
                    </button>
                    <p v-if="donationForm.proofFile" class="mt-2 text-sm text-green-600">
                      ✓ {{ donationForm.proofFile.name }} uploaded
                    </p>
                  </div>
                  <div class="flex space-x-4">
                    <button
                      @click="donationStep = 1"
                      class="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      @click="submitDonation"
                      :disabled="!donationForm.proofFile"
                      class="flex-1 bg-primary-orange hover:bg-primary-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Submit Donation
                    </button>
                  </div>
                </div>

                <!-- Step 3: Receipt -->
                <div v-if="donationStep === 3" class="text-center space-y-6">
                  <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckIcon class="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-primary-red mb-2">Thank You!</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Your donation of {{ formatCurrency(Number(donationForm.amount)) }} has been recorded and is pending verification.
                    </p>
                  </div>
                  <div class="bg-primary-orange/10 dark:bg-primary-orange/20 p-4 rounded-lg">
                    <p class="text-sm text-primary-red">
                      A receipt has been generated for your records. You can download it below and share it on social media to inspire others!
                    </p>
                  </div>
                  <div class="flex space-x-4">
                    <button
                      @click="generateReceipt"
                      class="flex-1 bg-primary-orange hover:bg-primary-orange/90 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <DownloadIcon class="h-4 w-4 mr-2 inline" />
                      Download Receipt
                    </button>
                    <button
                      @click="currentPage = 'home'"
                      class="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Back to Campaign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Login Page -->
        <div v-if="currentPage === 'login'" class="container mx-auto px-4 py-8">
          <div class="max-w-md mx-auto">
            <div class="text-center mb-8">
              <AdminIllustration class="w-32 h-32 mx-auto mb-4" />
              <h1 class="text-4xl font-bold text-primary-red mb-4">Admin Login</h1>
              <p class="text-gray-600 dark:text-gray-400">Enter your credentials to access the admin dashboard</p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
              <div class="p-6">
                <form @submit.prevent="handleLogin" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Username</label>
                    <input
                      v-model="loginForm.username"
                      type="text"
                      placeholder="admin"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Password</label>
                    <input
                      v-model="loginForm.password"
                      type="password"
                      placeholder="password"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                    />
                  </div>
                  <div v-if="loginError" class="text-red-600 text-sm">
                    {{ loginError }}
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-primary-red hover:bg-primary-red/90 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                </form>
                <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Demo credentials: admin / password
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Page -->
        <div v-if="currentPage === 'admin'" class="container mx-auto px-4 py-8">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-2">
              <SettingsIcon class="h-6 w-6 text-primary-red" />
              <h1 class="text-2xl font-bold text-primary-red">Admin Dashboard</h1>
            </div>
            <button
              @click="logout"
              class="border border-primary-red text-primary-red hover:bg-primary-red hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <!-- Admin Tabs -->
          <div class="mb-6">
            <div class="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                v-for="tab in ['campaign', 'pending', 'direct']"
                :key="tab"
                @click="adminTab = tab"
                :class="[
                  'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  adminTab === tab
                    ? 'bg-white dark:bg-gray-700 text-primary-red shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                {{ tab === 'campaign' ? 'Campaign Settings' : tab === 'pending' ? `Pending Donations ${pendingDonations.length > 0 ? `(${pendingDonations.length.toLocaleString()})` : ''}` : 'Direct Donations' }}
              </button>
            </div>
          </div>

          <!-- Campaign Settings Tab -->
          <div v-if="adminTab === 'campaign'" class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-xl font-bold text-primary-red">Campaign Configuration</h3>
              <p class="text-gray-600 dark:text-gray-400">Set up and manage your donation campaign</p>
            </div>
            <div class="p-6 space-y-6">
              <div>
                <label class="block text-sm font-medium mb-2">Campaign Title</label>
                <input
                  v-model="campaign.title"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Description</label>
                <textarea
                  v-model="campaign.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Target Amount ({{ currencySymbol }})</label>
                <input
                  v-model.number="campaign.targetAmount"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Campaign Currency</label>
                <select
                  v-model="campaign.currency"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                >
                  <option value="NGN">₦ Nigerian Naira</option>
                  <option value="USD">$ US Dollar</option>
                  <option value="GBP">£ British Pounds</option>
                </select>
              </div>
              <button
                @click="updateCampaign"
                class="w-full bg-primary-red hover:bg-primary-red/90 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                Update Campaign
              </button>
            </div>
          </div>

          <!-- Pending Donations Tab -->
          <div v-if="adminTab === 'pending'" class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-xl font-bold text-primary-red">Pending Donations</h3>
              <p class="text-gray-600 dark:text-gray-400">Review and approve donation submissions</p>
            </div>
            <div class="p-6">
              <div v-if="pendingDonations.length === 0" class="text-center py-8 text-gray-600 dark:text-gray-400">
                No pending donations to review
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="donation in pendingDonations"
                  :key="donation.id"
                  class="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                >
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="font-semibold text-primary-red">{{ donation.donorName }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ donation.email }}</p>
                      <p class="text-2xl font-bold text-primary-orange">{{ formatCurrency(donation.amount) }}</p>
                      <p v-if="donation.message" class="text-sm mt-2 italic">"{{ donation.message }}"</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs text-gray-500">{{ formatDate(donation.timestamp) }}</p>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="approveDonation(donation.id)"
                      class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <CheckIcon class="h-4 w-4 mr-2 inline" />
                      Approve
                    </button>
                    <button
                      @click="rejectDonation(donation.id)"
                      class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <XIcon class="h-4 w-4 mr-2 inline" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Direct Donations Tab -->
          <div v-if="adminTab === 'direct'" class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-xl font-bold text-primary-red">Add Direct Donation</h3>
              <p class="text-gray-600 dark:text-gray-400">Manually add donations received through direct transfers</p>
            </div>
            <div class="p-6 space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Amount ({{ currencySymbol }})</label>
                  <input
                    v-model="directDonationForm.amount"
                    type="number"
                    :placeholder="campaign.currency === 'NGN' ? '100000' : campaign.currency === 'USD' ? '1000' : '800'"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Donor Name</label>
                  <input
                    v-model="directDonationForm.donorName"
                    placeholder="John Doe"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Reference/Note</label>
                <input
                  v-model="directDonationForm.reference"
                  placeholder="Bank transfer reference or additional notes"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>
              <button
                @click="addDirectDonation"
                :disabled="!directDonationForm.amount || !directDonationForm.donorName"
                class="w-full bg-primary-orange hover:bg-primary-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                <PlusIcon class="h-4 w-4 mr-2 inline" />
                Add Donation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  HeartIcon, 
  SunIcon, 
  MoonIcon, 
  TargetIcon, 
  UsersIcon, 
  TrendingUpIcon, 
  UploadIcon, 
  CheckIcon, 
  XIcon, 
  DownloadIcon, 
  SettingsIcon, 
  PlusIcon 
} from 'lucide-vue-next'

// Themed Illustrations as Vue Components
const DonationIllustration = {
  template: `
    <svg viewBox="0 0 400 300" class="w-full h-full">
      <defs>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dd3523;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fa6900;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Background circles -->
      <circle cx="100" cy="80" r="40" fill="#dd3523" opacity="0.1"/>
      <circle cx="300" cy="120" r="60" fill="#fa6900" opacity="0.1"/>
      <!-- Main donation box -->
      <rect x="150" y="100" width="100" height="80" rx="10" fill="url(#redGradient)"/>
      <rect x="160" y="110" width="80" height="60" rx="5" fill="white" opacity="0.9"/>
      <!-- Heart symbol -->
      <path d="M200 130 C195 125, 185 125, 185 135 C185 145, 200 160, 200 160 C200 160, 215 145, 215 135 C215 125, 205 125, 200 130 Z" fill="#dd3523"/>
      <!-- Coins -->
      <circle cx="120" cy="200" r="15" fill="#fa6900"/>
      <text x="120" y="205" text-anchor="middle" fill="white" font-size="12" font-weight="bold">₦</text>
      <circle cx="280" cy="180" r="12" fill="#dd3523"/>
      <text x="280" y="185" text-anchor="middle" fill="white" font-size="10" font-weight="bold">₦</text>
      <!-- Hands giving -->
      <path d="M80 150 Q90 140, 100 150 L110 160 Q100 170, 90 160 Z" fill="#dd3523" opacity="0.8"/>
      <path d="M290 160 Q300 150, 310 160 L320 170 Q310 180, 300 170 Z" fill="#fa6900" opacity="0.8"/>
    </svg>
  `
}

const GivingIllustration = {
  template: `
    <svg viewBox="0 0 300 200" class="w-full h-full">
      <defs>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fa6900;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#dd3523;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Person giving -->
      <circle cx="150" cy="60" r="25" fill="#dd3523"/>
      <rect x="135" y="85" width="30" height="50" rx="15" fill="url(#orangeGradient)"/>
      <!-- Arms -->
      <rect x="120" y="95" width="15" height="30" rx="7" fill="#dd3523"/>
      <rect x="165" y="95" width="15" height="30" rx="7" fill="#dd3523"/>
      <!-- Gift box -->
      <rect x="185" y="115" width="25" height="20" rx="3" fill="#fa6900"/>
      <rect x="195" y="110" width="5" height="30" fill="#dd3523"/>
      <rect x="180" y="120" width="35" height="5" fill="#dd3523"/>
      <!-- Hearts floating -->
      <path d="M80 50 C77 47, 70 47, 70 53 C70 59, 80 70, 80 70 C80 70, 90 59, 90 53 C90 47, 83 47, 80 50 Z" fill="#fa6900" opacity="0.6"/>
      <path d="M220 40 C218 38, 213 38, 213 42 C213 46, 220 55, 220 55 C220 55, 227 46, 227 42 C227 38, 222 38, 220 40 Z" fill="#dd3523" opacity="0.6"/>
    </svg>
  `
}

const AdminIllustration = {
  template: `
    <svg viewBox="0 0 200 200" class="w-full h-full">
      <defs>
        <linearGradient id="adminGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dd3523;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fa6900;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Admin person -->
      <circle cx="100" cy="70" r="30" fill="url(#adminGradient)"/>
      <rect x="80" y="100" width="40" height="60" rx="20" fill="#dd3523"/>
      <!-- Laptop -->
      <rect x="60" y="140" width="80" height="50" rx="5" fill="#333"/>
      <rect x="65" y="145" width="70" height="35" rx="3" fill="white"/>
      <!-- Screen content -->
      <rect x="70" y="150" width="60" height="3" fill="#dd3523"/>
      <rect x="70" y="155" width="40" height="2" fill="#fa6900"/>
      <rect x="70" y="160" width="50" height="2" fill="#dd3523"/>
      <!-- Settings gear -->
      <circle cx="160" cy="50" r="15" fill="#fa6900" opacity="0.8"/>
      <circle cx="160" cy="50" r="8" fill="white"/>
      <rect x="155" y="35" width="10" height="5" fill="#fa6900"/>
      <rect x="155" y="60" width="10" height="5" fill="#fa6900"/>
      <rect x="145" y="45" width="5" height="10" fill="#fa6900"/>
      <rect x="170" y="45" width="5" height="10" fill="#fa6900"/>
    </svg>
  `
}

// Reactive state
const isDarkMode = ref(false)
const currentPage = ref('home')
const isAuthenticated = ref(false)
const donationStep = ref(1)
const adminTab = ref('campaign')
const loginError = ref('')

// Currency configuration
const currencies = {
  NGN: { symbol: '₦', name: 'Naira' },
  USD: { symbol: '$', name: 'Dollar' },
  GBP: { symbol: '£', name: 'Pounds' }
}

// Campaign data with Naira amounts
const campaign = ref({
  id: '1',
  title: 'Education for All Initiative',
  description: 'Supporting quality education access for underprivileged children across communities.',
  currency: 'NGN', // Add currency as campaign property
  targetAmount: 5000000, // 5 million Naira
  currentAmount: 3375000, // 3.375 million Naira
  donations: [
    {
      id: '1',
      amount: 250000, // 250k Naira
      donorName: 'Anonymous Donor',
      message: 'Happy to support this cause!',
      timestamp: new Date().toISOString(),
      verified: true,
    },
    {
      id: '2',
      amount: 125000, // 125k Naira
      donorName: 'John Smith',
      timestamp: new Date().toISOString(),
      verified: true,
    },
    {
      id: '3',
      amount: 50000, // 50k Naira
      donorName: 'Sarah Johnson',
      message: 'Great initiative!',
      timestamp: new Date().toISOString(),
      verified: true,
    }
  ],
  startDate: new Date().toISOString(),
})

// Forms
const donationForm = ref({
  amount: '',
  donorName: '',
  email: '',
  message: '',
  proofFile: null,
})

const loginForm = ref({
  username: '',
  password: '',
})

const directDonationForm = ref({
  amount: '',
  donorName: '',
  reference: '',
})

// Pending donations with Naira amounts
const pendingDonations = ref([
  {
    id: '1',
    amount: 75000, // 75k Naira
    donorName: 'Sarah Johnson',
    email: 'sarah@example.com',
    message: 'Great cause!',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    amount: 37500, // 37.5k Naira
    donorName: 'Mike Chen',
    email: 'mike@example.com',
    timestamp: new Date().toISOString(),
  },
])

// Computed properties
const currencySymbol = computed(() => currencies[campaign.value.currency].symbol)

const progressPercentage = computed(() => {
  return (campaign.value.currentAmount / campaign.value.targetAmount) * 100
})

const remainingAmount = computed(() => {
  return campaign.value.targetAmount - campaign.value.currentAmount
})

const daysActive = computed(() => {
  return Math.ceil((new Date().getTime() - new Date(campaign.value.startDate).getTime()) / (1000 * 60 * 60 * 24))
})

// Methods
const formatCurrency = (amount) => {
  return `${currencySymbol.value}${amount.toLocaleString()}`
}

const getBankDetails = () => {
  const bankDetails = {
    NGN: { account: '0123456789', bank: 'First Bank Nigeria' },
    USD: { account: '9876543210', bank: 'Chase Bank' },
    GBP: { account: '1122334455', bank: 'Barclays Bank' }
  }
  return bankDetails[campaign.value.currency]
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    donationForm.value.proofFile = file
  }
}

const submitDonation = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Add to pending donations
  pendingDonations.value.unshift({
    id: Date.now().toString(),
    amount: Number(donationForm.value.amount),
    donorName: donationForm.value.donorName,
    email: donationForm.value.email,
    message: donationForm.value.message,
    timestamp: new Date().toISOString(),
  })
  
  donationStep.value = 3
}

const generateReceipt = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = 600
  canvas.height = 400

  // Background
  ctx.fillStyle = '#dd3523'
  ctx.fillRect(0, 0, 600, 400)

  // Content
  ctx.fillStyle = 'white'
  ctx.font = 'bold 24px Arial'
  ctx.fillText('Donation Receipt', 50, 60)

  ctx.font = '18px Arial'
  ctx.fillText(`Donor: ${donationForm.value.donorName}`, 50, 120)
  ctx.fillText(`Amount: ${formatCurrency(Number(donationForm.value.amount))}`, 50, 160)
  ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 50, 200)
  ctx.fillText('Thank you for your contribution!', 50, 280)

  // Orange accent
  ctx.fillStyle = '#fa6900'
  ctx.fillRect(0, 350, 600, 50)

  // Download
  const link = document.createElement('a')
  link.download = 'donation-receipt.png'
  link.href = canvas.toDataURL()
  link.click()
}

const handleLogin = () => {
  if (loginForm.value.username === 'admin' && loginForm.value.password === 'password') {
    isAuthenticated.value = true
    currentPage.value = 'admin'
    loginError.value = ''
  } else {
    loginError.value = 'Invalid credentials'
  }
}

const logout = () => {
  isAuthenticated.value = false
  currentPage.value = 'home'
  loginForm.value = { username: '', password: '' }
}

const updateCampaign = () => {
  alert('Campaign updated successfully!')
}

const approveDonation = (donationId) => {
  const donation = pendingDonations.value.find(d => d.id === donationId)
  if (donation) {
    // Add to campaign donations
    campaign.value.donations.unshift({
      ...donation,
      verified: true,
    })
    // Update current amount
    campaign.value.currentAmount += donation.amount
    // Remove from pending
    pendingDonations.value = pendingDonations.value.filter(d => d.id !== donationId)
    alert('Donation approved successfully!')
  }
}

const rejectDonation = (donationId) => {
  pendingDonations.value = pendingDonations.value.filter(d => d.id !== donationId)
  alert('Donation rejected successfully!')
}

const addDirectDonation = () => {
  if (!directDonationForm.value.amount || !directDonationForm.value.donorName) return

  const newDonation = {
    id: Date.now().toString(),
    amount: Number(directDonationForm.value.amount),
    donorName: directDonationForm.value.donorName,
    message: directDonationForm.value.reference,
    timestamp: new Date().toISOString(),
    verified: true,
  }

  campaign.value.donations.unshift(newDonation)
  campaign.value.currentAmount += newDonation.amount
  
  directDonationForm.value = { amount: '', donorName: '', reference: '' }
  alert('Direct donation added successfully!')
}

// Initialize dark mode from localStorage
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    isDarkMode.value = savedDarkMode === 'true'
  }
})

</script>

<style scoped>
.primary-red {
  color: #dd3523;
}

.primary-orange {
  color: #fa6900;
}

.bg-primary-red {
  background-color: #dd3523;
}

.bg-primary-orange {
  background-color: #fa6900;
}

.border-primary-red {
  border-color: #dd3523;
}

.border-primary-orange {
  border-color: #fa6900;
}

.text-primary-red {
  color: #dd3523;
}

.text-primary-orange {
  color: #fa6900;
}

/* Dark mode styles */
.dark {
  color-scheme: dark;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Custom scrollbar for dark mode */
.dark ::-webkit-scrollbar {
  width: 8px;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Enhanced Progress Bar Animations */
.progress-fill {
  background: linear-gradient(90deg, #dd3523 0%, #fa6900 50%, #dd3523 100%);
  background-size: 200% 100%;
  animation: gradient-shift 3s ease-in-out infinite;
}

.shine-animation {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shine 2s ease-in-out infinite;
}

.wave-animation {
  background: linear-gradient(
    90deg,
    #dd3523 0%,
    #fa6900 25%,
    #dd3523 50%,
    #fa6900 75%,
    #dd3523 100%
  );
  background-size: 400% 100%;
  animation: wave-flow 4s ease-in-out infinite;
  opacity: 0.3;
}

.wave-overlay {
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    rgba(255, 255, 255, 0.1) 10px,
    transparent 20px
  );
  animation: wave-move 1.5s linear infinite;
}

.pulse-animation {
  animation: pulse-dot 2s ease-in-out infinite;
}

.progress-counter {
  display: inline-block;
  animation: counter-glow 2s ease-in-out infinite;
}

/* Keyframe Animations */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes shine {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes wave-flow {
  0%, 100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 200% 50%;
  }
  75% {
    background-position: 300% 50%;
  }
}

@keyframes wave-move {
  0% {
    background-position: 0px 0;
  }
  100% {
    background-position: 40px 0;
  }
}

@keyframes pulse-dot {
  0%, 100% {
    transform: translateY(-50%) scale(1);
    box-shadow: 0 0 0 0 rgba(250, 105, 0, 0.7);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 0 8px rgba(250, 105, 0, 0);
  }
}

@keyframes counter-glow {
  0%, 100% {
    color: #dd3523;
    text-shadow: 0 0 5px rgba(221, 53, 35, 0.3);
  }
  50% {
    color: #fa6900;
    text-shadow: 0 0 10px rgba(250, 105, 0, 0.5);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .progress-fill {
    animation-duration: 4s;
  }
  
  .wave-animation {
    animation-duration: 5s;
  }
}

/* Dark mode specific animations */
.dark .wave-animation {
  opacity: 0.2;
}

.dark .shine-animation {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
}
</style>