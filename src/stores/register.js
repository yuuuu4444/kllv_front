import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegisterStore = defineStore('register', () => {
  // 註冊第一步的資料
  const city = ref('');
  const district = ref('');
  const village = ref('');
  const address = ref('');

  // 重置所有資料的方法
  function resetRegisterData() {
    city.value = '';
    district.value = '';
    village.value = '';
    address.value = '';
  }

  return {
    // state
    city,
    district,
    village,
    address,
    // actions
    resetRegisterData,
  };
});
