# Form and Action Tracking

This document lists all files containing forms and their corresponding actions in the codebase. Use the checkboxes to track your modification status.

## Staff Master User

- [ ] **Route:** `app/routes/staff/master/user/new`
  - **File:** `app/routes/staff/master/user/new/index.tsx`
  - **Form:** `FormUser` (insert) -> `app/routes/staff/master/user/_components/form-user.tsx`
  - **Action:** `action` in `app/routes/staff/master/user/new/index.tsx`

- [ ] **Route:** `app/routes/staff/master/user/edit/$idUser`
  - **File:** `app/routes/staff/master/user/edit/index.tsx`
  - **Form:** `FormUser` (update) -> `app/routes/staff/master/user/_components/form-user.tsx`
  - **Action:** `action` in `app/routes/staff/master/user/edit/index.tsx`

## Staff Master Team

- [ ] **Route:** `app/routes/staff/master/team/new`
  - **File:** `app/routes/staff/master/team/new/index.tsx`
  - **Form:** `FormTeam` (insert) -> `app/routes/staff/master/team/_components/form-team.tsx`
  - **Action:** `action` in `app/routes/staff/master/team/new/index.tsx`

- [ ] **Route:** `app/routes/staff/master/team/edit/$idTeam`
  - **File:** `app/routes/staff/master/team/edit/index.tsx`
  - **Form:** `FormTeam` (update) -> `app/routes/staff/master/team/_components/form-team.tsx`
  - **Action:** `action` in `app/routes/staff/master/team/edit/index.tsx`

## Staff Master Skill

- [ ] **Route:** `app/routes/staff/master/skill` (List Page)
  - **File:** `app/routes/staff/master/skill/_components/list-skill-subskill.tsx`
  - **Forms:**
    - `FormSkill` (insert) -> `app/routes/staff/master/skill/_components/form-skill.tsx` -> Action: `team/${idTeam}/new`
    - `FormSkill` (update) -> `app/routes/staff/master/skill/_components/form-skill.tsx` -> Action: `${idSkill}/edit`
    - `FormSubSkill` (insert) -> `app/routes/staff/master/skill/_components/form-subskill.tsx` -> Action: `${idSkill}/subskill/new`
    - `FormSubSkill` (update) -> `app/routes/staff/master/skill/_components/form-subskill.tsx` -> Action: `${idSkill}/subskill/${idSubSkill}/edit`
    - `DeleteSkill` -> `app/routes/staff/master/skill/_components/delete-skill.tsx` -> Action: `${idSkill}/delete`
    - `DeleteSubSkill` -> `app/routes/staff/master/skill/_components/delete-subskill.tsx` -> Action: `${idSkill}/subskill/${idSubSkill}/delete`
    - `useFetcher` (order subskill) -> Action: `${subskills[0].idSkill}/update-urutan`
  - **Filter:** `FilterSkill` -> `app/routes/staff/master/skill/_components/filter-skill.tsx` -> Action: Current URL (GET)

## Staff Master Layanan

- [ ] **Route:** `app/routes/staff/master/layanan/new`
  - **File:** `app/routes/staff/master/layanan/new/index.tsx`
  - **Form:** `FormLayanan` (insert) -> `app/routes/staff/master/layanan/_components/form-layanan.tsx`
  - **Action:** `action` in `app/routes/staff/master/layanan/new/index.tsx`

- [ ] **Route:** `app/routes/staff/master/layanan/edit/$idLayanan`
  - **File:** `app/routes/staff/master/layanan/edit/index.tsx`
  - **Form:** `FormLayanan` (update) -> `app/routes/staff/master/layanan/_components/form-layanan.tsx`
  - **Action:** `action` in `app/routes/staff/master/layanan/edit/index.tsx`

## Staff Kuis

- [ ] **Route:** `app/routes/staff/kuis/skor`
  - **File:** `app/routes/staff/kuis/skor/index.tsx`
  - **Form:** `<Form method="post" action={../kuis/mulai-kuis/init/${item.idKuis}}>`

- [ ] **Route:** `app/routes/staff/kuis/mulai-kuis`
  - **File:** `app/routes/staff/kuis/mulai-kuis/index.tsx`
  - **Form:** `<Form method="post" action={init/${item.idKuis}}>`

- [ ] **Route:** `app/routes/staff/kuis/buat-kuis/kuis-maker/edit/$idKuisElement`
  - **File:** `app/routes/staff/kuis/buat-kuis/kuis-maker/edit/index.tsx`
  - **Form:** `FormKuis` (update) -> `app/routes/staff/kuis/buat-kuis/kuis-maker/_components/FormKuis.tsx`
  - **Action:** `action` in `app/routes/staff/kuis/buat-kuis/kuis-maker/edit/index.tsx`

- [ ] **Route:** `app/routes/staff/kuis/buat-kuis/kuis-maker/new/$idKuis`
  - **File:** `app/routes/staff/kuis/buat-kuis/kuis-maker/new/index.tsx`
  - **Form:** `FormKuis` (insert) -> `app/routes/staff/kuis/buat-kuis/kuis-maker/_components/FormKuis.tsx`
  - **Action:** `action` in `app/routes/staff/kuis/buat-kuis/kuis-maker/new/index.tsx`

## Staff Dokumen

- [ ] **Route:** `app/routes/staff/dokumen/tipe` (Search/Filter)
  - **File:** `app/routes/staff/dokumen/tipe/_components/search.tsx`
  - **Form:** `<Form method="GET">` -> Action: Current URL
  - **File:** `app/routes/staff/dokumen/tipe/_components/filter.tsx`
  - **Form:** `<Form method="GET">` -> Action: Current URL

- [ ] **Route:** `app/routes/staff/dokumen/tipe/edit/$idDokumen`
  - **File:** `app/routes/staff/dokumen/tipe/edit/index.tsx`
  - **Form:** `FormDokumen` (update) -> `app/routes/staff/dokumen/tipe/_components/FormDokumen.tsx`
  - **Action:** `action` in `app/routes/staff/dokumen/tipe/edit/index.tsx`

- [ ] **Route:** `app/routes/staff/dokumen/tipe/add/$tipeDokumen`
  - **File:** `app/routes/staff/dokumen/tipe/add/index.tsx`
  - **Form:** `FormDokumen` (insert) -> `app/routes/staff/dokumen/tipe/_components/FormDokumen.tsx`
  - **Action:** `action` in `app/routes/staff/dokumen/tipe/add/index.tsx`

## Staff Dashboard Subbidang

- [ ] **Route:** `app/routes/staff/dashboard-subbidang/dokumen-read-persentage` (Search/Filter)
  - **File:** `app/routes/staff/dashboard-subbidang/dokumen-read-persentage/_components/search.tsx`
  - **Form:** `<Form method="GET">` -> Action: Current URL
  - **File:** `app/routes/staff/dashboard-subbidang/dokumen-read-persentage/_components/filter.tsx`
  - **Form:** `<Form method="GET">` -> Action: Current URL
