<script setup lang="ts" >
import { TKP_BAZAR_VENG_UNIT } from 'src/utils/constants/app.constant';
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 10em" class="shadow-2">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar>
            <q-img src="src/assets/tkp-logo.png" alt="tkp-logo" />
          </q-avatar>
          <span class="text-weight-medium" style="user-select: none;">&nbsp;&nbsp;{{ TKP_BAZAR_VENG_UNIT }} </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="flex justify-center items-center" style="height: 3em;"> &copy; {{ TKP_BAZAR_VENG_UNIT }}, Lunglei
    </q-footer>
  </q-layout>
</template>