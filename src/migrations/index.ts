import * as migration_20260627_174204_initial from './20260627_174204_initial'

export const migrations = [
  {
    up: migration_20260627_174204_initial.up,
    down: migration_20260627_174204_initial.down,
    name: '20260627_174204_initial',
  },
]
