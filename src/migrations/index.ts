import * as migration_20260626_164047_initial from './20260626_164047_initial'

export const migrations = [
  {
    up: migration_20260626_164047_initial.up,
    down: migration_20260626_164047_initial.down,
    name: '20260626_164047_initial',
  },
]
