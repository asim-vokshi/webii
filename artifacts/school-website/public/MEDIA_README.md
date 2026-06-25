# Frontend Media Files

All website media assets should live inside this frontend `public` folder so they are easy to replace without touching backend code.

## Images

Current images are stored in:

```text
client/public/images/
```

They are referenced from the app with paths like:

```text
/images/building_front.jpeg
/images/students_group1.jpeg
```

To update an image, replace the file with a new file using the same name. If you add a new image name, update `client/src/lib/assets.ts` or the relevant static data image path.

## Videos

Future videos should be stored in:

```text
client/public/videos/
```

Use paths like:

```text
/videos/school-tour.mp4
/videos/activity.webm
```

No video files are currently present in the repository.
