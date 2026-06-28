import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// EXISTING WORKOUTS (unchanged)
// ─────────────────────────────────────────────
const WORKOUTS = [
  {
    id: 1, name: "Workout #1", focus: "Rings", icon: "⭕", color: "#5a8a5a",
    pairType: "push/pull",
    warmupNote: "Band pull-aparts, shoulder circles, dead hang 30s, ring support hold",
    bank: {
      push: [
        { id:"r-pu1", name:"Ring Push Up", note:"Body at 45°, control wobble" },
        { id:"r-pu2", name:"Ring Dips", note:"Full ROM, elbows back" },
        { id:"r-pu3", name:"Planche Push Up (Lean)", note:"Forward lean, tuck progression" },
        { id:"r-pu4", name:"Tricep Jacknife Push Up", note:"Rings below knees, hinged body" },
        { id:"r-pu5", name:"Ring Flys", note:"Wide, slow eccentric" },
      ],
      pull: [
        { id:"r-pl1", name:"Ring Row", note:"Feet on ground, body at 45°" },
        { id:"r-pl2", name:"Pull Ups (Ring)", note:"Dead hang, full ROM" },
        { id:"r-pl3", name:"L-Sit Pull Ups", note:"Hold tuck L through pull" },
        { id:"r-pl4", name:"Muscle Up Progression", note:"Jump assist or band — work the transition" },
        { id:"r-pl5", name:"Back Roll to Support", note:"Controlled, slow" },
      ],
      stabilizer: [
        { id:"r-st1", name:"Support Hold", note:"Static hold at top of dip, 15–30s" },
        { id:"r-st2", name:"Skin the Cat", note:"Slow rotation, tuck if needed" },
        { id:"r-st3", name:"Front Lever Tuck Hold", note:"5–10s holds x3" },
        { id:"r-st4", name:"Back Lever Tuck Hold", note:"5–10s holds x3" },
        { id:"r-st5", name:"Ice Makers", note:"Arc from hip to overhead, light" },
      ],
    },
  },
  {
    id: 2, name: "Workout #2", focus: "Skills / Cardio / Balance / Legs", icon: "🎯", color: "#5a7aaa",
    pairType: "legs/core",
    warmupNote: "Hip circles, leg swings, bodyweight squat x10, single-leg balance 30s each",
    bank: {
      push: [
        { id:"sk-l1", name:"Box Jumps", note:"Land soft, absorb through hips" },
        { id:"sk-l2", name:"Core Step Ups", note:"Slow, controlled, single-leg focus" },
        { id:"sk-l3", name:"1-Leg Straight Leg Dead Lift", note:"BW or light DB" },
        { id:"sk-l4", name:"Reverse Lunge with Twist", note:"BW to start, add load later" },
        { id:"sk-l5", name:"Overhead BB Lunges", note:"Start with empty bar" },
        { id:"sk-l6", name:"Sally (Squat Hold)", note:"BW squat to Flower — full song" },
      ],
      pull: [
        { id:"sk-c1", name:"Side to Side Glider Plank", note:"Slow controlled slides" },
        { id:"sk-c2", name:"Mixed Grip Row w/ Balance Ball", note:"Feet on ball, maintain plank" },
        { id:"sk-c3", name:"Alt DB Bench, Feet Elevated", note:"Core engaged throughout" },
        { id:"sk-c4", name:"1-Leg SLDL (Opp Arm)", note:"Cross-body engagement" },
        { id:"sk-c5", name:"Overhead BB Lunge + Twist", note:"Add rotation at bottom" },
      ],
      stabilizer: [
        { id:"sk-st1", name:"Single-Leg Balance Hold", note:"Eyes closed progression, 30s" },
        { id:"sk-st2", name:"Pistol Squat Progression", note:"Box assist → band → free" },
        { id:"sk-st3", name:"1-Leg Box Jump", note:"Single-leg takeoff and land" },
        { id:"sk-st4", name:"Kick Turn Practice", note:"Hip pivot, weight transfer" },
        { id:"sk-st5", name:"Reverse Lunge Balance Pause", note:"Pause 2s in lunge before standing" },
      ],
    },
  },
  {
    id: 3, name: "Workout #3", focus: "Lift — Chest & Back", icon: "🏋️", color: "#aa5a5a",
    pairType: "push/pull",
    warmupNote: "Band pull-aparts x20, push up x10 slow, inverted row x10, shoulder rotations",
    bank: {
      push: [
        { id:"cb-pu1", name:"BB Bench Press", note:"Start 60% of old max, technique first" },
        { id:"cb-pu2", name:"DB Bench Press", note:"10 lbs/hand to start" },
        { id:"cb-pu3", name:"Incline Bench", note:"BB or DB, moderate weight" },
        { id:"cb-pu4", name:"Reverse Grip Bench", note:"Lighter than standard" },
        { id:"cb-pu5", name:"Dips", note:"Parallel bars or bench dips" },
        { id:"cb-pu6", name:"Planche Push Up Lean", note:"Forward lean — tuck progression" },
      ],
      pull: [
        { id:"cb-pl1", name:"BB Rows", note:"Controlled, no hip pop" },
        { id:"cb-pl2", name:"DB 1-Arm Rows", note:"15 lbs to start, full stretch at bottom" },
        { id:"cb-pl3", name:"Pull Ups", note:"Dead hang, band assist if needed" },
        { id:"cb-pl4", name:"Inverted Rows", note:"Bar or rings, heels on ground" },
        { id:"cb-pl5", name:"Lat Pull Downs", note:"20 lbs to start" },
        { id:"cb-pl6", name:"Muscle Ups", note:"Jump or band assist" },
      ],
      stabilizer: [
        { id:"cb-st1", name:"Flys (Light DB)", note:"5 lbs — stretch and squeeze" },
        { id:"cb-st2", name:"Straight Arm Cable Push Downs", note:"Arms straight, lat engagement" },
        { id:"cb-st3", name:"Face Pulls", note:"External rotation, rear delt" },
        { id:"cb-st4", name:"DB Pull Overs", note:"Lat + serratus, light" },
        { id:"cb-st5", name:"Band Pull-Aparts", note:"3x20 — rotator cuff health" },
      ],
    },
  },
  {
    id: 4, name: "Workout #4", focus: "Lift — Legs", icon: "🦵", color: "#7a5aaa",
    pairType: "legs/hinge",
    warmupNote: "Hip circles, goblet squat x10 light, glute bridges x15, leg swings x10 each",
    bank: {
      push: [
        { id:"lg-q1", name:"Front Squats", note:"Start light — technique before load" },
        { id:"lg-q2", name:"Back Squats", note:"Full depth, controlled descent" },
        { id:"lg-q3", name:"Hack Squats", note:"BB behind legs or machine" },
        { id:"lg-q4", name:"Jump Squats", note:"BW — land soft, absorb through hips" },
        { id:"lg-q5", name:"Overhead BB Lunges", note:"Empty bar to start" },
        { id:"lg-q6", name:"1-Leg Lunges (Bulgarian)", note:"Rear foot elevated" },
      ],
      pull: [
        { id:"lg-h1", name:"Dead Lift", note:"Start 60%, perfect the hinge" },
        { id:"lg-h2", name:"Straight Leg Dead Lift", note:"Hamstring focus, no knee bend" },
        { id:"lg-h3", name:"1-Leg RDL", note:"BW or light KB/DB" },
        { id:"lg-h4", name:"Good Mornings", note:"Light bar, hip hinge pattern" },
        { id:"lg-h5", name:"Glute Bridges (Weighted)", note:"Bar across hips" },
      ],
      stabilizer: [
        { id:"lg-st1", name:"Calf Raises (Single Leg)", note:"Full ROM, slow eccentric" },
        { id:"lg-st2", name:"Pistol Squat Progression", note:"Box assist to start" },
        { id:"lg-st3", name:"Turkish Get Up", note:"Light KB — hip and core stability" },
        { id:"lg-st4", name:"Side-Lying Hip Abduction", note:"Band or BW, glute medius" },
        { id:"lg-st5", name:"1-Leg Box Jump", note:"Single-leg takeoff and land, soft" },
      ],
    },
  },
  {
    id: 5, name: "Workout #5", focus: "Skills / Free Day / Handstands", icon: "🤸", color: "#5aaa8a",
    pairType: "skill/mobility",
    warmupNote: "Wrist circles, shoulder openers, cat-cow x10, hollow body hold 20s",
    bank: {
      push: [
        { id:"hs-1", name:"Handstand (Wall)", note:"15–30s holds, work toward freestanding" },
        { id:"hs-2", name:"Handstand Push Ups (Pike)", note:"Progress to wall HSPU" },
        { id:"hs-3", name:"Handstand Walk", note:"Wall kick-ups, hip alignment" },
        { id:"hs-4", name:"Head Stand Core Work", note:"Tuck, extend, L-sit from headstand" },
      ],
      pull: [
        { id:"hs-r1", name:"Full Body Stretch", note:"Hip flexors, hamstrings, thoracic — 20 min" },
        { id:"hs-r2", name:"Cobra to Stand", note:"Flow sequence — spine extension" },
        { id:"hs-r3", name:"Limber 11", note:"Full Joe DeFranco mobility routine" },
        { id:"hs-r4", name:"Get Ups with Light Weight", note:"Turkish get up, light KB" },
      ],
      stabilizer: [
        { id:"hs-st1", name:"Free Work", note:"Whatever feels right — movement exploration" },
        { id:"hs-st2", name:"Hollow Body Hold", note:"30s — press lower back into floor" },
        { id:"hs-st3", name:"L-Sit (Parallel Bars / Floor)", note:"Tuck to full, 3x10s" },
        { id:"hs-st4", name:"Bridge Hold", note:"Full thoracic extension, hold 20s" },
      ],
    },
  },
  {
    id: 6, name: "Workout #6", focus: "Lift — Shoulders / Bis / Tris", icon: "💪", color: "#aa8a5a",
    pairType: "push/pull",
    warmupNote: "Band pull-aparts x20, face pulls x15 light, arm circles, wrist flexor stretch",
    bank: {
      push: [
        { id:"sa-pu1", name:"Overhead BB Shoulder Press", note:"Strict press, no leg drive" },
        { id:"sa-pu2", name:"Overhead DB Shoulder Press", note:"Alternate or bilateral" },
        { id:"sa-pu3", name:"Handstand Push Ups (Pike)", note:"Progress to wall HSPU" },
        { id:"sa-pu4", name:"Tri Extensions (Vary)", note:"Overhead / skull crusher / cable" },
        { id:"sa-pu5", name:"Cable Tri Push Downs", note:"Elbows pinned, full extension" },
        { id:"sa-pu6", name:"Tri Jacknife Push Ups (Rings)", note:"Angle body, rings below knees" },
      ],
      pull: [
        { id:"sa-pl1", name:"Curls (Vary)", note:"Hammer / supinated / concentration" },
        { id:"sa-pl2", name:"Cable Curls", note:"Consistent tension through ROM" },
        { id:"sa-pl3", name:"Straight Arm Pull Downs", note:"Lat + long head bicep" },
        { id:"sa-pl4", name:"BB Mason Twists", note:"Rotational power, seated" },
        { id:"sa-pl5", name:"BOSU Overhead Press", note:"Shoulder stability on unstable surface" },
      ],
      stabilizer: [
        { id:"sa-st1", name:"Straight Arm Shoulder Raises", note:"Light — front/lateral/rear" },
        { id:"sa-st2", name:"Straight Arm Flys", note:"Cable or DB — rear delt / lat" },
        { id:"sa-st3", name:"Face Pulls", note:"External rotation, rear delt health" },
        { id:"sa-st4", name:"Band Pull-Aparts", note:"3x20 — rotator cuff" },
        { id:"sa-st5", name:"Wrist Curls / Extensions", note:"Forearm health, light" },
      ],
    },
  },
  {
    id: 7, name: "Supplement: Core", focus: "Core Supplemental", icon: "🎯", color: "#5a5aaa",
    pairType: "core/core",
    warmupNote: "Cat-cow x10, dead bug x10, hollow body 20s, plank 30s",
    bank: {
      push: [
        { id:"co-1", name:"BB Mason Twist", note:"Seated, light, slow" },
        { id:"co-2", name:"Cable Rotations", note:"Single arm, controlled" },
        { id:"co-3", name:"Windshield Wipers (Ground)", note:"Legs straight, slow" },
        { id:"co-4", name:"Windshield Wipers (Bar)", note:"Hang and rotate — advanced" },
        { id:"co-5", name:"Medicine Ball Mason Toss", note:"Light ball, rotational power" },
        { id:"co-6", name:"Candlesticks", note:"Roll back, press feet to ceiling" },
      ],
      pull: [
        { id:"co-7", name:"Bat Hang Sit Ups", note:"Inverted on bar — full crunch" },
        { id:"co-8", name:"L-Sit (Support)", note:"In & outs on parallel bars" },
        { id:"co-9", name:"Skin the Cat to L-Sit", note:"Rings, assisted" },
        { id:"co-10", name:"Wheelies (Ab Wheel)", note:"Ring rollout variation" },
        { id:"co-11", name:"BOSU Sit Ups", note:"Full ROM on dome" },
        { id:"co-12", name:"Knee Tuck Push Ups", note:"Push up + tuck knees to chest" },
      ],
      stabilizer: [
        { id:"co-st1", name:"Farmer's Carry", note:"Heavy, long walk — grip and core" },
        { id:"co-st2", name:"DB Pull Overs", note:"Lat + serratus + core" },
        { id:"co-st3", name:"Overhead DB Press (Single Arm)", note:"Stabilize the obliques" },
        { id:"co-st4", name:"Dead Bug", note:"Controlled, lower back glued down" },
        { id:"co-st5", name:"Head Stand L-Sit", note:"Tuck to extend progression" },
      ],
    },
  },
  {
    id: 8, name: "Supplement: Paddle", focus: "Paddle-Specific", icon: "🛶", color: "#5a8aaa",
    pairType: "push/pull",
    warmupNote: "Shoulder circles, band pull-aparts x20, BOSU balance 60s, lat stretch",
    bank: {
      push: [
        { id:"pd-pu1", name:"Tri Paddle Extensions", note:"Simulate paddle exit — tri focus" },
        { id:"pd-pu2", name:"BOSU Overhead Press", note:"Shoulder stability, unstable" },
        { id:"pd-pu3", name:"Lying Tri Extensions", note:"Cable or DB skull crusher" },
      ],
      pull: [
        { id:"pd-pl1", name:"Straight Arm Pull Down", note:"Lat activation — paddle stroke sim" },
        { id:"pd-pl2", name:"Pull Down Twists", note:"Combine pull with rotation" },
        { id:"pd-pl3", name:"Low Arm Pull Throughs", note:"Low cable/band — catch position" },
        { id:"pd-pl4", name:"Mixed Grip Row w/ Balance Ball", note:"Feet on ball, maintain plank" },
      ],
      stabilizer: [
        { id:"pd-st1", name:"BOSU Squats", note:"Balance + proprioception" },
        { id:"pd-st2", name:"Kick Turn Practice", note:"Hip pivot, weight transfer on BOSU" },
        { id:"pd-st3", name:"BB Mason Twists", note:"Rotational power for paddle stroke" },
      ],
    },
  },
  {
    id: 9, name: "Pilates", focus: "Pilates — Bar & Straps", icon: "🧘", color: "#aa5a8a",
    pairType: "legs/core",
    warmupNote: "Pelvic tilts x10, glute bridge x15, hip circles, cat-cow x10",
    bank: {
      push: [
        { id:"pi-l1", name:"Bar Squat (Heavy)", note:"Full depth, controlled" },
        { id:"pi-l2", name:"Bar 45° Squat (Heavy)", note:"Wide stance, angled" },
        { id:"pi-l3", name:"Bar 1-Leg Squat (Med)", note:"Depth over load" },
        { id:"pi-l4", name:"Bridge Squats (Med)", note:"Bridge then squat combo" },
        { id:"pi-l5", name:"Single Leg Push Board", note:"Standing, push back on one leg" },
        { id:"pi-l6", name:"Splits — Heavy & Light", note:"Bilateral split stance work" },
      ],
      pull: [
        { id:"pi-c1", name:"Strap Arcs", note:"Slow, full ROM, shoulder stability" },
        { id:"pi-c2", name:"Strap 45°", note:"Angled pull, lat focus" },
        { id:"pi-c3", name:"Glute Bridges (Med)", note:"Full hip extension, pause at top" },
        { id:"pi-c4", name:"Side Lying RDL (Strap)", note:"Hamstring + glute medius" },
        { id:"pi-c5", name:"Skaters — Alt Weight", note:"Lateral load transfer, knee tracking" },
      ],
      stabilizer: [
        { id:"pi-st1", name:"Plank Variations", note:"RKC, side, moving planks" },
        { id:"pi-st2", name:"Shoulder Stand Variations", note:"Legs overhead, controlled" },
        { id:"pi-st3", name:"Side Lying Squat (Strap)", note:"Hip external rotation" },
        { id:"pi-st4", name:"Strap Squats", note:"Counterbalance for depth" },
      ],
    },
  },
];

const SEQUENCE = [1, 3, 2, 4, 6, 5];

const PHASE = {
  1: { name:"Foundation", range:"Sessions 1–8",  sets:2, repsLow:10, repsHigh:12, intensity:"~60% effort. Pattern first, load later." },
  2: { name:"Build",      range:"Sessions 9–16", sets:3, repsLow:8,  repsHigh:10, intensity:"~70% effort. Add weight when you hit top of range two sessions running." },
  3: { name:"Strength",   range:"Sessions 17+",  sets:4, repsLow:5,  repsHigh:8,  intensity:"~80% effort. Push closer to failure. Deload every 4th week." },
};

// ─────────────────────────────────────────────
// EXERCISE LIBRARY — organized by muscle group
// ─────────────────────────────────────────────
const EXERCISE_LIBRARY = [
  {
    group: "Warm-Up",
    icon: "🔥",
    color: "#c87830",
    description: "Bodyweight movement prep — pick 4–6",
    exercises: [
      { id:"wu-1",  name:"Jumping Jacks",             note:"2 min, light pace — elevate heart rate",        bw:true },
      { id:"wu-2",  name:"Arm Circles",                note:"10 fwd + 10 back — shoulder mobility",          bw:true },
      { id:"wu-3",  name:"Leg Swings",                 note:"10 each leg, front-back + side-side",           bw:true },
      { id:"wu-4",  name:"Hip Circles",                note:"10 each direction — loosen hips",               bw:true },
      { id:"wu-5",  name:"Cat-Cow",                    note:"10 slow reps — thoracic mobility",              bw:true },
      { id:"wu-6",  name:"Bear Crawl Walkouts",        note:"5 reps — shoulder + hamstring",                 bw:true },
      { id:"wu-7",  name:"Mountain Climbers",          note:"20 reps slow — hip flexor activation",          bw:true },
      { id:"wu-8",  name:"Bodyweight Squat",           note:"10 reps, full depth, slow",                     bw:true },
      { id:"wu-9",  name:"Dead Hang",                  note:"30s — shoulder decompression",                  bw:true },
      { id:"wu-10", name:"Inchworm",                   note:"5 reps — hamstring + shoulder flow",            bw:true },
      { id:"wu-11", name:"Glute Bridge (BW)",          note:"15 reps — activate posterior chain",            bw:true },
      { id:"wu-12", name:"High Knees",                 note:"30s — heart rate + hip flexors",                bw:true },
      { id:"wu-13", name:"World's Greatest Stretch",   note:"5 reps each side — full body opener",          bw:true },
      { id:"wu-14", name:"Wrist Circles",              note:"10 each direction — prep for pressing",         bw:true },
      { id:"wu-15", name:"Hip Flexor Stretch",         note:"30s each side — kneeling lunge",                bw:true },
      { id:"wu-16", name:"Hollow Body Hold",           note:"20s — core + posterior chain activation",       bw:true },
      { id:"wu-17", name:"Shoulder Rolls",             note:"10 fwd + 10 back",                              bw:true },
      { id:"wu-18", name:"Scapular Push-Ups",          note:"10 reps — serratus activation",                 bw:true },
    ],
  },
  {
    group: "Chest",
    icon: "💪",
    color: "#aa5a5a",
    description: "Push — horizontal & incline pressing",
    exercises: [
      { id:"ch-1",  name:"Bench Press (Barbell)",          note:"Flat — control descent, drive through" },
      { id:"ch-2",  name:"Incline Bench Press (BB)",       note:"30–45° — upper chest emphasis" },
      { id:"ch-3",  name:"Decline Bench Press",            note:"Lower chest focus" },
      { id:"ch-4",  name:"Dumbbell Bench Press",           note:"Greater ROM than barbell" },
      { id:"ch-5",  name:"Incline Dumbbell Press",         note:"Neutral or pronated grip" },
      { id:"ch-6",  name:"Push-Up",                        note:"Full ROM, elbows at 45°",                  bw:true },
      { id:"ch-7",  name:"Wide-Grip Push-Up",              note:"Hands outside shoulders — more chest",     bw:true },
      { id:"ch-8",  name:"Diamond Push-Up",                note:"Hands together — inner chest + triceps",   bw:true },
      { id:"ch-9",  name:"Elevated Push-Up",               note:"Feet on bench — upper chest",              bw:true },
      { id:"ch-10", name:"Dips (Chest Focus)",             note:"Lean forward, elbows flared",              bw:true },
      { id:"ch-11", name:"Cable Chest Fly",                note:"Constant tension, full arc" },
      { id:"ch-12", name:"Pec Deck",                       note:"Machine — squeeze at top, slow eccentric" },
      { id:"ch-13", name:"Dumbbell Fly",                   note:"Bench — stretch at bottom, light" },
      { id:"ch-14", name:"Dumbbell Pullover",              note:"Chest + serratus stretch" },
      { id:"ch-15", name:"Low-to-High Cable Fly",          note:"Incline emphasis via cable angle" },
      { id:"ch-16", name:"Svend Press",                    note:"Squeeze plates together throughout" },
      { id:"ch-17", name:"Smith Machine Bench Press",      note:"Good for controlled groove learning" },
      { id:"ch-18", name:"Clap Push-Up",                   note:"Explosive — power development",            bw:true },
    ],
  },
  {
    group: "Back",
    icon: "🔙",
    color: "#5a7aaa",
    description: "Pull — lats, rhomboids, traps, lower back",
    exercises: [
      { id:"bk-1",  name:"Pull-Up (Wide Grip)",            note:"Dead hang, full ROM — lat width",          bw:true },
      { id:"bk-2",  name:"Pull-Up (Narrow / Neutral)",     note:"More lower lat + bicep",                   bw:true },
      { id:"bk-3",  name:"Chin-Up",                        note:"Supinated grip — more bicep involvement",  bw:true },
      { id:"bk-4",  name:"Lat Pulldown (Wide Grip)",       note:"Pull to collarbone" },
      { id:"bk-5",  name:"Lat Pulldown (Narrow Grip)",     note:"More lower lat activation" },
      { id:"bk-6",  name:"Barbell Row (Bent Over)",        note:"Hinge to 45°, no hip pop" },
      { id:"bk-7",  name:"Dumbbell Row (One-Arm)",         note:"Full stretch at bottom, explosive pull" },
      { id:"bk-8",  name:"Seated Cable Row",               note:"Elbows in, squeeze scapula at top" },
      { id:"bk-9",  name:"Wide-Grip Seated Cable Row",     note:"More upper back, elbows flared" },
      { id:"bk-10", name:"T-Bar Row",                      note:"Chest on pad or free-standing" },
      { id:"bk-11", name:"Inverted Row",                   note:"Body horizontal, heels on ground",         bw:true },
      { id:"bk-12", name:"Straight Arm Pulldown",          note:"Lat isolation — keep arms straight" },
      { id:"bk-13", name:"Face Pulls",                     note:"External rotation + rear delt health" },
      { id:"bk-14", name:"Hyperextensions",                note:"Lower back + glutes — control descent" },
      { id:"bk-15", name:"Deadlift (Conventional)",        note:"Full body — king of back builders" },
      { id:"bk-16", name:"Rack Pulls",                     note:"Partial range — heavy load tolerance" },
      { id:"bk-17", name:"Scapular Pull-Up",               note:"Active scapula, no elbow bend",            bw:true },
      { id:"bk-18", name:"Gorilla Row",                    note:"Alternating KB row — anti-rotation" },
    ],
  },
  {
    group: "Shoulders",
    icon: "🏋️",
    color: "#8a5aaa",
    description: "Press, raise, and rotation",
    exercises: [
      { id:"sh-1",  name:"Overhead Press (Barbell)",       note:"Strict — no leg drive" },
      { id:"sh-2",  name:"Overhead Press (Dumbbell)",      note:"Seated or standing, neutral grip" },
      { id:"sh-3",  name:"Arnold Press",                   note:"Rotate from neutral to pronated" },
      { id:"sh-4",  name:"Lateral Raise",                  note:"Light, slow, stop at shoulder height" },
      { id:"sh-5",  name:"Cable Lateral Raise",            note:"Unilateral, constant tension" },
      { id:"sh-6",  name:"Front Raise",                    note:"Alternate or bilateral, controlled" },
      { id:"sh-7",  name:"Rear Delt Fly",                  note:"Hinge, elbows out, squeeze" },
      { id:"sh-8",  name:"Reverse Cable Fly",              note:"Cross-cable or machine" },
      { id:"sh-9",  name:"Face Pulls",                     note:"External rotation — rear delt health" },
      { id:"sh-10", name:"Upright Row",                    note:"Elbows above wrists" },
      { id:"sh-11", name:"Pike Push-Up",                   note:"Inverted V — shoulder press pattern",     bw:true },
      { id:"sh-12", name:"Handstand Push-Up",              note:"Wall-supported or freestanding",          bw:true },
      { id:"sh-13", name:"Machine Shoulder Press",         note:"Guided path — good for beginners" },
      { id:"sh-14", name:"Shoulder Halo Raises",           note:"Plate or DB — 360° arc" },
      { id:"sh-15", name:"Plate Lateral Raise",            note:"Slower than DB — good tension" },
    ],
  },
  {
    group: "Biceps",
    icon: "💪",
    color: "#5a8aaa",
    description: "Elbow flexion — peak + thickness",
    exercises: [
      { id:"bi-1",  name:"Barbell Curl",                   note:"Full ROM, no swing" },
      { id:"bi-2",  name:"Dumbbell Curl (Alternating)",    note:"Supinate at top of each rep" },
      { id:"bi-3",  name:"Hammer Curl",                    note:"Neutral grip — brachialis + brachioradialis" },
      { id:"bi-4",  name:"Simultaneous Hammer Curl",       note:"Both arms together" },
      { id:"bi-5",  name:"Preacher Curl (EZ-bar)",         note:"Isolation — no cheating at bottom" },
      { id:"bi-6",  name:"Concentration Curl",             note:"Seated, elbow on inner thigh" },
      { id:"bi-7",  name:"Cable Curl",                     note:"Consistent tension through full ROM" },
      { id:"bi-8",  name:"Incline Dumbbell Curl",          note:"Full stretch at bottom" },
      { id:"bi-9",  name:"Reverse Curl",                   note:"Pronated grip — brachioradialis focus" },
      { id:"bi-10", name:"Chin-Up",                        note:"Best compound bicep builder",              bw:true },
      { id:"bi-11", name:"Drag Curl",                      note:"Elbows back, bar drags up torso" },
      { id:"bi-12", name:"Bicep Curl with Band",           note:"Accommodating resistance" },
    ],
  },
  {
    group: "Triceps",
    icon: "💪",
    color: "#aa6a5a",
    description: "Elbow extension — mass + definition",
    exercises: [
      { id:"tr-1",  name:"Tricep Pushdown (Cable)",        note:"Elbows pinned, full extension" },
      { id:"tr-2",  name:"Rope Tricep Pushdown",           note:"Flare out at bottom for stretch" },
      { id:"tr-3",  name:"Skull Crushers",                 note:"EZ-bar, lower to forehead, slow" },
      { id:"tr-4",  name:"Overhead Tricep Extension (DB)", note:"Full stretch overhead" },
      { id:"tr-5",  name:"Close-Grip Bench Press",         note:"Shoulder-width grip — heavy load" },
      { id:"tr-6",  name:"Dips (Tricep Focus)",            note:"Upright torso, elbows close",              bw:true },
      { id:"tr-7",  name:"Diamond Push-Up",                note:"Hands forming diamond below chest",         bw:true },
      { id:"tr-8",  name:"Tricep Kickback",                note:"Hinge, extend fully behind" },
      { id:"tr-9",  name:"French Press (Bar/EZ-bar)",      note:"Overhead — long head stretch" },
      { id:"tr-10", name:"Bench Dip",                      note:"Feet elevated for more challenge",         bw:true },
      { id:"tr-11", name:"Single Arm Tricep Extension",    note:"Cable or DB — unilateral" },
      { id:"tr-12", name:"Low Bar Tricep Push-Up",         note:"Bar at hip height — angled",               bw:true },
    ],
  },
  {
    group: "Quads",
    icon: "🦵",
    color: "#7a5aaa",
    description: "Knee extension + squat patterns",
    exercises: [
      { id:"qu-1",  name:"Back Squat",                     note:"Full depth, neutral spine" },
      { id:"qu-2",  name:"Front Squat",                    note:"Elbows high — quad dominant" },
      { id:"qu-3",  name:"Bulgarian Split Squat",          note:"Rear foot elevated — depth over load" },
      { id:"qu-4",  name:"Leg Press",                      note:"Feet shoulder-width, full ROM" },
      { id:"qu-5",  name:"Narrow Leg Press (Quad Focus)",  note:"Feet closer together" },
      { id:"qu-6",  name:"Leg Extension",                  note:"Isolation — squeeze at top" },
      { id:"qu-7",  name:"Lunge (Forward)",                note:"Step through, knee tracks over toe" },
      { id:"qu-8",  name:"Lunge (Reverse)",                note:"Less knee stress than forward" },
      { id:"qu-9",  name:"Jump Squat",                     note:"Land soft, absorb through hips",           bw:true },
      { id:"qu-10", name:"Hack Squat (Machine)",           note:"Knees forward, quad crush" },
      { id:"qu-11", name:"Pistol Squat",                   note:"Single-leg full squat — advanced",         bw:true },
      { id:"qu-12", name:"Wall Sit",                       note:"Isometric — 30–60s holds",                 bw:true },
      { id:"qu-13", name:"Step-Ups",                       note:"Box or bench, slow eccentric" },
      { id:"qu-14", name:"Goblet Squat",                   note:"DB or KB — great for learning depth" },
      { id:"qu-15", name:"Sissy Squat",                    note:"Extreme quad stretch — advanced",          bw:true },
      { id:"qu-16", name:"Smith Machine Squat",            note:"Good for learning groove" },
    ],
  },
  {
    group: "Hamstrings",
    icon: "🦵",
    color: "#5aaa7a",
    description: "Hip hinge + knee flexion",
    exercises: [
      { id:"hm-1",  name:"Romanian Deadlift (BB)",         note:"Slight knee bend, feel stretch in hamstrings" },
      { id:"hm-2",  name:"Romanian Deadlift (DB)",         note:"More balance challenge, greater ROM" },
      { id:"hm-3",  name:"Stiff-Leg Deadlift",            note:"Straighter legs — max hamstring stretch" },
      { id:"hm-4",  name:"Lying Leg Curl",                 note:"Slow eccentric — 3 seconds down" },
      { id:"hm-5",  name:"Seated Leg Curl",                note:"Different hamstring angle than lying" },
      { id:"hm-6",  name:"Single-Leg RDL",                 note:"BW or DB — hinge + balance" },
      { id:"hm-7",  name:"Good Mornings",                  note:"Bar on back, hip hinge — keep light" },
      { id:"hm-8",  name:"Glute Ham Raise",                note:"Eccentric hamstring — advanced",           bw:true },
      { id:"hm-9",  name:"Deficit Deadlift",               note:"Stand on plate — greater ROM" },
      { id:"hm-10", name:"Banded RDL",                     note:"Accommodating resistance" },
      { id:"hm-11", name:"Cable Pull-Through",             note:"Hip hinge with cable between legs" },
      { id:"hm-12", name:"Lying Leg Curl (Single Leg)",    note:"Unilateral — fix imbalances" },
    ],
  },
  {
    group: "Glutes",
    icon: "🍑",
    color: "#aa5a8a",
    description: "Hip extension + abduction",
    exercises: [
      { id:"gl-1",  name:"Hip Thrust (Barbell)",           note:"Shoulders on bench, drive through heels" },
      { id:"gl-2",  name:"Hip Thrust (Banded)",            note:"Band across hips for resistance" },
      { id:"gl-3",  name:"Smith Machine Hip Thrust",       note:"Easy to load, guided path" },
      { id:"gl-4",  name:"Glute Bridge (Floor)",           note:"BW — squeeze hard at top",                 bw:true },
      { id:"gl-5",  name:"Single-Leg Hip Thrust",          note:"More glute isolation" },
      { id:"gl-6",  name:"Single-Leg Glute Bridge",        note:"Floor version — great for warm-up",        bw:true },
      { id:"gl-7",  name:"Cable Kickback",                 note:"Hip extension — full squeeze at top" },
      { id:"gl-8",  name:"Glute Kickback (BW)",            note:"Quadruped — slow and controlled",          bw:true },
      { id:"gl-9",  name:"Fire Hydrant",                   note:"Hip abduction — glute medius",             bw:true },
      { id:"gl-10", name:"Sumo Squat",                     note:"Wide stance — glute + inner thigh" },
      { id:"gl-11", name:"Curtsy Lunge",                   note:"Cross behind — glute medius emphasis" },
      { id:"gl-12", name:"Abductor Machine",               note:"Glute medius isolation" },
      { id:"gl-13", name:"Bulgarian Split Squat",          note:"Deep hip hinge — posterior emphasis" },
      { id:"gl-14", name:"Frog Pump",                      note:"Feet together, knees out — BW glute",     bw:true },
      { id:"gl-15", name:"Side Kickback",                  note:"Standing or cable — lateral emphasis" },
    ],
  },
  {
    group: "Core",
    icon: "🎯",
    color: "#5a5aaa",
    description: "Stability, anti-rotation, flexion",
    exercises: [
      { id:"co-lib-1",  name:"Plank",                      note:"Elbows under shoulders — hollow body",     bw:true },
      { id:"co-lib-2",  name:"Side Plank",                 note:"Hip stacked, don't sag",                   bw:true },
      { id:"co-lib-3",  name:"Dead Bug",                   note:"Lower back down — opposite arm/leg",       bw:true },
      { id:"co-lib-4",  name:"Hollow Body Hold",           note:"Arms overhead, legs straight",             bw:true },
      { id:"co-lib-5",  name:"Ab Wheel Rollout",           note:"Control the eccentric — don't collapse" },
      { id:"co-lib-6",  name:"Hanging Leg Raise",          note:"Straight legs or tuck — control descent",  bw:true },
      { id:"co-lib-7",  name:"Hanging Knee Raise",         note:"Beginner version — tuck knees to chest",   bw:true },
      { id:"co-lib-8",  name:"L-Sit",                      note:"Parallel bars or floor — hold 10s+",       bw:true },
      { id:"co-lib-9",  name:"Russian Twist",              note:"Feet off floor, rotate slowly" },
      { id:"co-lib-10", name:"Weighted Russian Twist",     note:"Add plate or DB" },
      { id:"co-lib-11", name:"Bicycle Crunch",             note:"Slow — full extension each rep",           bw:true },
      { id:"co-lib-12", name:"Crunch",                     note:"Short ROM — upper abs only",               bw:true },
      { id:"co-lib-13", name:"Reverse Crunch",             note:"Hips off floor at top",                    bw:true },
      { id:"co-lib-14", name:"Leg Raise (Floor)",          note:"Control descent — lower back stays down",  bw:true },
      { id:"co-lib-15", name:"Windshield Wipers",          note:"Hang or floor — oblique killer",           bw:true },
      { id:"co-lib-16", name:"Pallof Press",               note:"Anti-rotation — cable or band" },
      { id:"co-lib-17", name:"Plank Hip Dips",             note:"Side-to-side — obliques",                  bw:true },
      { id:"co-lib-18", name:"Star Crunch",                note:"Arms + legs extend simultaneously",        bw:true },
      { id:"co-lib-19", name:"Seated Knee Tuck",           note:"Hands on bench, tuck knees to chest",     bw:true },
      { id:"co-lib-20", name:"Dragon Flag",                note:"Advanced full-body tension",               bw:true },
    ],
  },
  {
    group: "Calves",
    icon: "🦶",
    color: "#5aaa8a",
    description: "Ankle plantar flexion",
    exercises: [
      { id:"ca-1",  name:"Standing Calf Raise",            note:"Full ROM — pause at top and bottom" },
      { id:"ca-2",  name:"Single-Leg Calf Raise (BW)",     note:"More range + challenge",                   bw:true },
      { id:"ca-3",  name:"Single-Leg Calf Raise (DB)",     note:"Add load to single-leg version" },
      { id:"ca-4",  name:"Seated Calf Raise",              note:"Soleus focus (bent knee position)" },
      { id:"ca-5",  name:"Weighted Calf Raise",            note:"BB on back or hold DBs" },
      { id:"ca-6",  name:"Calf Raise on Leg Press",        note:"Full ROM, slow eccentric" },
    ],
  },
  {
    group: "Forearms",
    icon: "💪",
    color: "#8a7a5a",
    description: "Grip + wrist strength",
    exercises: [
      { id:"fa-1",  name:"Barbell Wrist Curl",             note:"Forearms on bench, full ROM" },
      { id:"fa-2",  name:"Reverse Wrist Curl",             note:"Extensors — balance with flexors" },
      { id:"fa-3",  name:"Behind-the-Back Wrist Curl",     note:"Bar behind you — greater stretch" },
      { id:"fa-4",  name:"Hammer Curl",                    note:"Brachioradialis emphasis" },
      { id:"fa-5",  name:"Reverse Curl",                   note:"Pronated grip — wrist extensors" },
      { id:"fa-6",  name:"Dead Hang",                      note:"30–60s — grip endurance",                  bw:true },
      { id:"fa-7",  name:"Farmer's Carry",                 note:"Heavy walk — grip + core" },
      { id:"fa-8",  name:"Wrist Roller",                   note:"Extend + flex — full forearm" },
    ],
  },
];

// ─────────────────────────────────────────────
// CUSTOM WORKOUT TEMPLATES (mirror the 9 workouts)
// selections: { [groupIndex]: [exerciseId, ...] }
// ─────────────────────────────────────────────
const TEMPLATES = [
  {
    id:"t1", name:"Custom Rings", icon:"⭕", color:"#5a8a5a",
    desc:"Ring push/pull + stabilizer — bodyweight focused",
    selections:{ 0:["wu-9","wu-2","wu-17"], 1:["ch-6","ch-10","ch-8"], 2:["bk-1","bk-2","bk-11","bk-17"], 3:["sh-11","sh-12"] }
  },
  {
    id:"t2", name:"Custom Skills & Legs", icon:"🎯", color:"#5a7aaa",
    desc:"Leg strength, balance, and core skill work",
    selections:{ 0:["wu-4","wu-3","wu-8","wu-11"], 6:["qu-3","qu-7","qu-9","qu-11"], 7:["hm-6","hm-1"], 8:["gl-4","gl-9"], 9:["co-lib-1","co-lib-3"] }
  },
  {
    id:"t3", name:"Custom Chest & Back", icon:"🏋️", color:"#aa5a5a",
    desc:"Horizontal push/pull supersets",
    selections:{ 0:["wu-1","wu-2","wu-9"], 1:["ch-1","ch-4","ch-11","ch-13"], 2:["bk-1","bk-6","bk-7","bk-13"] }
  },
  {
    id:"t4", name:"Custom Legs", icon:"🦵", color:"#7a5aaa",
    desc:"Quad, hamstring, glute, and calf work",
    selections:{ 0:["wu-4","wu-3","wu-11","wu-8"], 6:["qu-1","qu-2","qu-3","qu-7"], 7:["hm-1","hm-4","hm-6"], 8:["gl-1","gl-5"], 10:["ca-1","ca-2"] }
  },
  {
    id:"t5", name:"Custom Skills / Handstands", icon:"🤸", color:"#5aaa8a",
    desc:"Skill work, mobility, and bodyweight",
    selections:{ 0:["wu-5","wu-6","wu-14","wu-16"], 3:["sh-11","sh-12"], 9:["co-lib-4","co-lib-8","co-lib-6"] }
  },
  {
    id:"t6", name:"Custom Shoulders / Arms", icon:"💪", color:"#aa8a5a",
    desc:"Shoulder press, bicep curls, tricep extensions",
    selections:{ 0:["wu-2","wu-17","wu-14"], 3:["sh-1","sh-2","sh-4","sh-7","sh-9"], 4:["bi-1","bi-2","bi-3"], 5:["tr-1","tr-3","tr-4"] }
  },
  {
    id:"t7", name:"Custom Core", icon:"🎯", color:"#5a5aaa",
    desc:"Core stability, rotation, and flexion",
    selections:{ 0:["wu-5","wu-7","wu-16"], 9:["co-lib-1","co-lib-2","co-lib-3","co-lib-5","co-lib-6","co-lib-9","co-lib-15"] }
  },
  {
    id:"t8", name:"Custom Paddle", icon:"🛶", color:"#5a8aaa",
    desc:"Lat, rotational, and shoulder stability for paddle sports",
    selections:{ 0:["wu-2","wu-9","wu-17"], 2:["bk-12","bk-8","bk-7","bk-13"], 3:["sh-9","sh-7"], 9:["co-lib-9","co-lib-16","co-lib-15"] }
  },
  {
    id:"t9", name:"Custom Pilates", icon:"🧘", color:"#aa5a8a",
    desc:"Glutes, legs, core, and strap movements",
    selections:{ 0:["wu-4","wu-11","wu-5"], 6:["qu-3","qu-7","qu-13"], 8:["gl-1","gl-4","gl-9","gl-5"], 9:["co-lib-1","co-lib-2","co-lib-13"] }
  },
];

// ─────────────────────────────────────────────
// CARDIO ACTIVITIES
// ─────────────────────────────────────────────
const CARDIO_ACTIVITIES = [
  { id:"crd-hike", name:"Hiking",          icon:"🥾" },
  { id:"crd-mtb",  name:"Mountain Biking", icon:"🚵" },
  { id:"crd-road", name:"Road Biking",     icon:"🚴" },
  { id:"crd-kay",  name:"Kayaking",        icon:"🛶" },
  { id:"crd-sup",  name:"SUP",             icon:"🏄" },
  { id:"crd-erg",  name:"ERG",             icon:"🚣" },
];

// ─────────────────────────────────────────────
// ROUND BUILDER
// ─────────────────────────────────────────────
function buildRounds(workout, sessionIndex) {
  const { bank } = workout;
  const rotate = (arr, offset) => { const i = offset % arr.length; return [...arr.slice(i), ...arr.slice(0, i)]; };
  const pushRot = rotate(bank.push, sessionIndex);
  const pullRot = rotate(bank.pull, sessionIndex + 1);
  const stabRot = rotate(bank.stabilizer, sessionIndex + 2);
  return [
    { label:"Warm-Up",  intensity:"Light — movement prep only", exercises:[
      { ...pushRot[0], name:`Warm-Up: ${pushRot[0].name}`, note:"Light / BW — pattern only" },
      { ...pullRot[0], name:`Warm-Up: ${pullRot[0].name}`, note:"Light / BW — pattern only" },
    ]},
    { label:"Round 1", intensity:"Working weight", exercises:[ pushRot[1]||pushRot[0], pullRot[1]||pullRot[0], stabRot[0] ] },
    { label:"Round 2", intensity:"Match or add weight", exercises:[ pushRot[2]||pushRot[0], pullRot[2]||pullRot[0], stabRot[1]||stabRot[0] ] },
    { label:"Round 3", intensity:"Push if feeling strong", exercises:[ pushRot[3]||pushRot[1], pullRot[3]||pullRot[1], stabRot[2]||stabRot[0] ] },
  ];
}

// ─────────────────────────────────────────────
// RECOMMENDATION ENGINE
// ─────────────────────────────────────────────
function getRecommendation(exId, exHistory, phase) {
  if (!exHistory || exHistory.length === 0) return null;
  const last = exHistory[exHistory.length - 1];
  const lastSets = last.sets.filter(s => s.reps);
  if (!lastSets.length) return null;
  const intent = last.nextIntent; // "+", "=", "-", or null
  const lastReps = lastSets.map(s => parseInt(s.reps) || 0);
  const lastWeights = lastSets.map(s => s.weight || "BW");
  const avgReps = Math.round(lastReps.reduce((a, b) => a + b, 0) / lastReps.length);
  const heaviestW = Math.max(...lastSets.map(s => parseFloat(s.weight) || 0));
  const lastWeight = lastWeights[lastWeights.length - 1];
  const isBodyweight = !lastWeight || lastWeight === "BW" || lastWeight === "" || isNaN(parseFloat(lastWeight));
  const targetHigh = PHASE[phase].repsHigh;
  const targetLow = PHASE[phase].repsLow;
  let rec = "", badge = "same";

  // Intent from last session takes priority for weighted exercises
  if (intent === "+" && !isBodyweight && heaviestW > 0) {
    const nextW = Math.ceil(heaviestW * 1.05 / 5) * 5;
    rec = `You flagged ↑ — try ${nextW} lbs (~5% up from ${heaviestW})`;
    badge = "up";
  } else if (intent === "-" && !isBodyweight) {
    const w = parseFloat(lastWeight);
    const dropW = Math.floor(w * 0.95 / 5) * 5;
    rec = `You flagged ↓ — try ${dropW} lbs (drop ~5%)`;
    badge = "down";
  } else if (intent === "=") {
    rec = `You flagged = — same weight as last time, push for reps`;
    badge = "same";
  } else if (isBodyweight) {
    if (avgReps >= targetHigh) { rec = `Hit ${avgReps} reps — add light load or progress variation`; badge = "up"; }
    else if (avgReps < targetLow - 2) { rec = `${avgReps} reps last time — focus on form, same variation`; }
    else { rec = `${avgReps} reps last time — push for ${Math.min(avgReps + 1, targetHigh)}`; }
  } else {
    const w = parseFloat(lastWeight);
    if (avgReps >= targetHigh) { const nextW = Math.ceil(w * 1.05 / 2.5) * 2.5; rec = `${avgReps} reps @ ${w} — try ${nextW} lbs`; badge = "up"; }
    else if (avgReps < targetLow - 1) { const dropW = Math.floor(w * 0.95 / 2.5) * 2.5; rec = `${avgReps} reps @ ${w} — consider ${dropW} lbs`; badge = "down"; }
    else { rec = `${avgReps} reps @ ${w} lbs — stay here, push for ${Math.min(avgReps + 1, targetHigh)} reps`; }
  }
  return { rec, badge, lastDate: new Date(last.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }), lastSets, lastWeights, intent };
}

// ─────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────
function storageSave(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
function storageLoad(key, fallback) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; }
}

// ─────────────────────────────────────────────
// AI CHAT
// ─────────────────────────────────────────────
async function callClaude(messages) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, messages }),
    });
    const data = await res.json();
    return data.content?.find(b => b.type==="text")?.text || "No response.";
  } catch { return "Connection error — check your network."; }
}

function buildSystemPrompt(workout, rounds, loggedSets, meta) {
  const phase = PHASE[meta.phase];
  const logSummary = rounds.flatMap(r =>
    r.exercises.map(ex => {
      const sets = loggedSets[ex.id] || [];
      if (!sets.length) return `  ${ex.name}: not logged`;
      return `  ${ex.name}: ${sets.map((s,i)=>`set${i+1}=${s.reps||"?"}reps@${s.weight||"BW"}`).join(", ")}`;
    })
  ).join("\n");
  return `You are a direct, no-fluff strength coach. The athlete has a serious background (competitive ultra-endurance paddler, Yukon 1000 5th place) but is rebuilding base fitness after time off. They know their body. Be specific, brief, and practical.

Workout: ${workout.name || "Custom"} — ${workout.focus || "Custom Build"}
Phase: ${phase.name} (${phase.range}) — ${phase.intensity}
Target: ${phase.sets} sets × ${phase.repsLow}–${phase.repsHigh} reps

Session log:
${logSummary}

Review this log, flag anything off, and suggest next-session targets. 3–5 sentences max unless asked to elaborate.`;
}

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
function PhaseBar({ meta }) {
  const phase = PHASE[meta.phase];
  const pct = Math.min((meta.sessionCount / 24) * 100, 100);
  return (
    <div style={{ background:"#141414", border:"1px solid #2a2a2a", borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ color:"#c8b870", fontWeight:700, fontSize:15 }}>Phase {meta.phase}: {phase.name}</span>
        <span style={{ color:"#555", fontSize:12 }}>Session {meta.sessionCount}</span>
      </div>
      <div style={{ color:"#555", fontSize:11, marginBottom:8 }}>{phase.range} · {phase.sets} sets × {phase.repsLow}–{phase.repsHigh} reps</div>
      <div style={{ background:"#222", borderRadius:4, height:5 }}>
        <div style={{ background:"#c8b870", width:`${pct}%`, height:"100%", borderRadius:4, transition:"width 0.4s" }} />
      </div>
    </div>
  );
}

function UpNextCard({ workout, onStart }) {
  if (!workout) return null;
  return (
    <div onClick={() => onStart(workout)}
      style={{ background:`linear-gradient(135deg, #141e14, #0d0d0d)`, border:`1px solid ${workout.color}55`,
        borderRadius:10, padding:"16px 18px", marginBottom:16, cursor:"pointer" }}>
      <div style={{ color:"#555", fontSize:10, textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>Up Next</div>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:28 }}>{workout.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ color:"#c8b870", fontWeight:700, fontSize:16 }}>{workout.name}</div>
          <div style={{ color:"#666", fontSize:13 }}>{workout.focus}</div>
        </div>
        <div style={{ background:"#c8b870", color:"#1a1a00", borderRadius:6, padding:"8px 14px", fontWeight:700, fontSize:13 }}>
          Start →
        </div>
      </div>
    </div>
  );
}

function ExerciseRow({ ex, sets, recommendation, onAddSet, onUpdateSet, intent, onSetIntent }) {
  const badgeColor = { up:"#5aaa5a", down:"#aa6a5a", same:"#5a6aaa" };
  const hasLogged = sets.some(s => s.reps);
  const heaviestLogged = Math.max(...sets.map(s => parseFloat(s.weight) || 0));
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
        <div style={{ flex:1 }}>
          <div style={{ color:"#e0d0a0", fontSize:13, fontWeight:600 }}>{ex.name}</div>
          <div style={{ color:"#3a3a2a", fontSize:11, fontStyle:"italic" }}>{ex.note}</div>
        </div>
      </div>
      {recommendation && (
        <div style={{ background:"#111a11", border:`1px solid ${badgeColor[recommendation.badge]}33`,
          borderRadius:6, padding:"7px 10px", marginBottom:8 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
            <span style={{ color:"#4a6a4a", fontSize:10, textTransform:"uppercase", letterSpacing:1 }}>Last: {recommendation.lastDate}</span>
            <span style={{ color: badgeColor[recommendation.badge], fontSize:10, fontWeight:700 }}>
              {recommendation.badge === "up" ? "↑ Increase" : recommendation.badge === "down" ? "↓ Reduce" : "→ Hold"}
            </span>
          </div>
          <div style={{ color:"#888", fontSize:12 }}>
            {recommendation.lastSets.map((s,i) => `${s.reps}r${s.weight && s.weight!=="BW" ? `@${s.weight}` : ""}`).join("  ")}
          </div>
          <div style={{ color:"#6aaa6a", fontSize:12, marginTop:3, fontWeight:600 }}>{recommendation.rec}</div>
        </div>
      )}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
        {sets.map((s, i) => (
          <div key={i} style={{ display:"flex", gap:4, alignItems:"center" }}>
            <span style={{ color:"#333", fontSize:10 }}>S{i+1}</span>
            <input type="number" placeholder="reps" value={s.reps}
              onChange={e => onUpdateSet(i,"reps",e.target.value)}
              style={{ width:44, background:"#181818", border:"1px solid #2a2a2a", borderRadius:4, color:"#c8c8a0", padding:"3px 6px", fontSize:13 }} />
            <input type="text" placeholder="wt/BW" value={s.weight}
              onChange={e => onUpdateSet(i,"weight",e.target.value)}
              style={{ width:58, background:"#181818", border:"1px solid #2a2a2a", borderRadius:4, color:"#c8c8a0", padding:"3px 6px", fontSize:13 }} />
          </div>
        ))}
        <button onClick={onAddSet}
          style={{ background:"#181818", border:"1px solid #2a2a2a", color:"#444", borderRadius:4, padding:"3px 8px", cursor:"pointer", fontSize:11 }}>+set</button>
      </div>
      {/* Intent buttons — shown after logging any set */}
      {hasLogged && onSetIntent && (
        <div style={{ display:"flex", gap:6, marginTop:8, alignItems:"center" }}>
          <span style={{ color:"#333", fontSize:10 }}>Next:</span>
          {["-","=","+"].map(v => {
            const active = intent === v;
            const col = v==="+" ? "#5aaa5a" : v==="-" ? "#aa5a5a" : "#5a5aaa";
            const bgA = v==="+" ? "#0d1f0d" : v==="-" ? "#1f0d0d" : "#0d0d1f";
            return (
              <button key={v} onClick={() => onSetIntent(ex.id, v)}
                style={{ background: active ? bgA : "#181818",
                  border:`1px solid ${active ? col : "#2a2a2a"}`,
                  color: active ? col : "#444",
                  borderRadius:4, padding:"3px 10px", cursor:"pointer", fontSize:14, fontWeight:700,
                  lineHeight:1 }}>
                {v}
              </button>
            );
          })}
          {intent === "+" && heaviestLogged > 0 && (
            <span style={{ color:"#5aaa5a", fontSize:10 }}>
              → ~{Math.ceil(heaviestLogged * 1.05 / 5) * 5} lbs
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function RoundCard({ round, roundIdx, loggedSets, exHistory, phase, onAddSet, onUpdateSet, intents, onSetIntent }) {
  const [open, setOpen] = useState(roundIdx === 0);
  const isWarmup = roundIdx === 0;
  const filled = round.exercises.filter(ex => (loggedSets[ex.id]||[]).some(s => s.reps)).length;
  return (
    <div style={{ background:"#0d0d0d", border:`1px solid ${isWarmup?"#2a2a1a":"#1e1e1e"}`, borderRadius:8, marginBottom:10, overflow:"hidden" }}>
      <div onClick={() => setOpen(!open)}
        style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 14px", cursor:"pointer",
          background: isWarmup?"#111100":"#0d0d0d" }}>
        <div>
          <span style={{ color:isWarmup?"#8a8a60":"#c8b870", fontWeight:700, fontSize:14 }}>{round.label}</span>
          <span style={{ color:"#333", fontSize:11, marginLeft:10 }}>{round.intensity}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {filled > 0 && <span style={{ color:"#5a8a5a", fontSize:11 }}>{filled}/{round.exercises.length} ✓</span>}
          <span style={{ color:"#333", fontSize:12 }}>{open?"▲":"▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding:"12px 14px", borderTop:"1px solid #1a1a1a" }}>
          {round.exercises.map(ex => {
            const rec = isWarmup ? null : getRecommendation(ex.id, exHistory[ex.id], phase);
            return (
              <ExerciseRow key={ex.id} ex={ex}
                sets={loggedSets[ex.id] || [{ reps:"", weight:"" }]}
                recommendation={rec}
                onAddSet={() => onAddSet(ex.id)}
                onUpdateSet={(i, field, val) => onUpdateSet(ex.id, i, field, val)}
                intent={isWarmup ? undefined : (intents||{})[ex.id]}
                onSetIntent={isWarmup ? undefined : onSetIntent}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function PostSessionChat({ workout, rounds, loggedSets, meta }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);
  const systemPrompt = buildSystemPrompt(workout, rounds, loggedSets, meta);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  const init = async () => {
    setStarted(true); setLoading(true);
    const reply = await callClaude([{ role:"user", content: systemPrompt + "\n\nBriefly review what I logged and give me your take. Then ask what I want to dig into." }]);
    setMsgs([{ role:"assistant", content:reply }]);
    setLoading(false);
  };
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:"user", content:input };
    const history = [...msgs, userMsg];
    setMsgs(history); setInput(""); setLoading(true);
    const reply = await callClaude([
      { role:"user", content: systemPrompt + "\n\nConversation so far:" },
      { role:"assistant", content:"Understood, I have the session context." },
      ...history,
    ]);
    setMsgs([...history, { role:"assistant", content:reply }]);
    setLoading(false);
  };
  return (
    <div style={{ marginTop:20 }}>
      <div style={{ color:"#444", fontSize:10, textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>Post-Session Coach</div>
      {!started ? (
        <button onClick={init}
          style={{ width:"100%", background:"#101a10", border:"1px solid #2a4a2a", color:"#6aaa6a", borderRadius:8, padding:14, fontSize:14, cursor:"pointer", fontWeight:600 }}>
          🤖 Get Coaching Feedback
        </button>
      ) : (
        <div style={{ background:"#0a0f0a", border:"1px solid #1a2a1a", borderRadius:8, overflow:"hidden" }}>
          <div style={{ maxHeight:300, overflowY:"auto", padding:14 }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ marginBottom:14 }}>
                <div style={{ color:m.role==="assistant"?"#6aaa6a":"#c8b870", fontSize:10, fontWeight:700, marginBottom:3, textTransform:"uppercase", letterSpacing:1 }}>
                  {m.role==="assistant" ? "Coach" : "You"}
                </div>
                <div style={{ color:"#aaa", fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{m.content}</div>
              </div>
            ))}
            {loading && <div style={{ color:"#3a5a3a", fontSize:13, fontStyle:"italic" }}>Thinking...</div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ display:"flex", gap:8, padding:"10px 14px", borderTop:"1px solid #1a2a1a" }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && !e.shiftKey && send()}
              placeholder="Bench felt heavy. Left shoulder tight on incline..."
              style={{ flex:1, background:"#111", border:"1px solid #2a2a2a", borderRadius:6, color:"#c0c0a0", padding:"8px 12px", fontSize:13 }} />
            <button onClick={send} disabled={loading}
              style={{ background:"#1a2a1a", border:"1px solid #3a5a3a", color:"#6aaa6a", borderRadius:6, padding:"8px 14px", cursor:"pointer", fontSize:14, fontWeight:700 }}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PROGRAM SESSION VIEW (unchanged)
// ─────────────────────────────────────────────
function SessionView({ workout, meta, exHistory, onBack, onComplete }) {
  const [loggedSets, setLoggedSets] = useState({});
  const [intents, setIntents] = useState({});
  const [done, setDone] = useState(false);
  const rounds = buildRounds(workout, meta.sessionCount);
  const addSet = (exId) =>
    setLoggedSets(prev => ({ ...prev, [exId]: [...(prev[exId]||[{reps:"",weight:""}]), {reps:"",weight:""}] }));
  const updateSet = (exId, i, field, val) =>
    setLoggedSets(prev => {
      const sets = [...(prev[exId]||[{reps:"",weight:""}])];
      sets[i] = { ...sets[i], [field]:val };
      return { ...prev, [exId]:sets };
    });
  const setIntent = (exId, val) =>
    setIntents(prev => ({ ...prev, [exId]: prev[exId] === val ? null : val }));
  const totalLogged = Object.values(loggedSets).filter(s => s.some(x => x.reps)).length;
  const handleFinish = () => { setDone(true); onComplete(workout.id, loggedSets, rounds, null, intents); };
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <button onClick={onBack}
          style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
        <div>
          <div style={{ color:workout.color, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{workout.icon} {workout.name}</div>
          <div style={{ color:"#d0c090", fontSize:17, fontWeight:700 }}>{workout.focus}</div>
        </div>
      </div>
      <div style={{ background:"#111100", border:"1px solid #2a2a14", borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
        <div style={{ color:"#555", fontSize:10, marginBottom:2 }}>WARM-UP</div>
        <div style={{ color:"#6a6a40", fontSize:12 }}>{workout.warmupNote}</div>
      </div>
      {rounds.map((r, i) => (
        <RoundCard key={i} round={r} roundIdx={i} loggedSets={loggedSets}
          exHistory={exHistory} phase={meta.phase} onAddSet={addSet} onUpdateSet={updateSet}
          intents={intents} onSetIntent={setIntent} />
      ))}
      {!done ? (
        <button onClick={handleFinish} disabled={totalLogged === 0}
          style={{ width:"100%", marginTop:8, background:totalLogged>0?"#c8b870":"#1a1a1a",
            color:totalLogged>0?"#1a1a00":"#333", border:"none", borderRadius:8, padding:14,
            fontSize:15, fontWeight:700, cursor:totalLogged>0?"pointer":"not-allowed" }}>
          {totalLogged > 0 ? `Finish Session — ${totalLogged} exercises logged` : "Log at least one exercise"}
        </button>
      ) : (
        <>
          <div style={{ background:"#0d150d", border:"1px solid #2a4a2a", borderRadius:8, padding:14, marginTop:8 }}>
            <div style={{ color:"#6aaa6a", fontWeight:700, marginBottom:3 }}>✓ Session saved</div>
            <div style={{ color:"#555", fontSize:12 }}>Talk to the coach below — narrate how it went, flag anything that felt off.</div>
          </div>
          <PostSessionChat workout={workout} rounds={rounds} loggedSets={loggedSets} meta={meta} />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// CUSTOM SESSION VIEW (for library-built workouts)
// ─────────────────────────────────────────────
function CustomSessionView({ sections, meta, exHistory, onBack, onComplete }) {
  const [loggedSets, setLoggedSets] = useState({});
  const [intents, setIntents] = useState({});
  const [done, setDone] = useState(false);
  const [openSections, setOpenSections] = useState(() => {
    const o = {};
    sections.forEach((s, i) => { o[i] = true; });
    return o;
  });

  const addSet = (exId) =>
    setLoggedSets(prev => ({ ...prev, [exId]: [...(prev[exId]||[{reps:"",weight:""}]), {reps:"",weight:""}] }));
  const updateSet = (exId, i, field, val) =>
    setLoggedSets(prev => {
      const sets = [...(prev[exId]||[{reps:"",weight:""}])];
      sets[i] = { ...sets[i], [field]:val };
      return { ...prev, [exId]:sets };
    });
  const setIntent = (exId, val) =>
    setIntents(prev => ({ ...prev, [exId]: prev[exId] === val ? null : val }));

  const totalLogged = Object.values(loggedSets).filter(s => s.some(x => x.reps)).length;
  const allExercises = sections.flatMap(s => s.exercises);

  const fakeWorkout = { name:"Custom Build", focus: sections.map(s => s.group).join(" · ") };
  const fakeRounds = sections.map(s => ({ label: s.group, intensity: s.description || "", exercises: s.exercises }));

  const handleFinish = () => {
    setDone(true);
    onComplete("custom", loggedSets, fakeRounds, fakeWorkout.focus, intents);
  };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <button onClick={onBack}
          style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
        <div>
          <div style={{ color:"#c87830", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>🏗 Custom Workout</div>
          <div style={{ color:"#d0c090", fontSize:15, fontWeight:700 }}>{fakeWorkout.focus}</div>
        </div>
      </div>

      {sections.map((section, si) => {
        const isWarmup = section.group === "Warm-Up";
        const filled = section.exercises.filter(ex => (loggedSets[ex.id]||[]).some(s => s.reps)).length;
        const open = openSections[si];
        return (
          <div key={si} style={{ background:"#0d0d0d", border:`1px solid ${isWarmup?"#2a2a1a":"#1e1e1e"}`, borderRadius:8, marginBottom:10, overflow:"hidden" }}>
            <div onClick={() => setOpenSections(prev => ({ ...prev, [si]: !prev[si] }))}
              style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 14px", cursor:"pointer",
                background: isWarmup ? "#111100" : "#0d0d0d" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>{section.icon}</span>
                <span style={{ color: isWarmup ? "#8a8a60" : "#c8b870", fontWeight:700, fontSize:14 }}>{section.group}</span>
                {isWarmup && <span style={{ color:"#555", fontSize:10, marginLeft:4 }}>bodyweight prep</span>}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                {filled > 0 && <span style={{ color:"#5a8a5a", fontSize:11 }}>{filled}/{section.exercises.length} ✓</span>}
                <span style={{ color:"#333", fontSize:12 }}>{open?"▲":"▼"}</span>
              </div>
            </div>
            {open && (
              <div style={{ padding:"12px 14px", borderTop:"1px solid #1a1a1a" }}>
                {section.exercises.map(ex => {
                  const rec = isWarmup ? null : getRecommendation(ex.id, exHistory[ex.id], meta.phase);
                  return (
                    <ExerciseRow key={ex.id} ex={ex}
                      sets={loggedSets[ex.id] || [{ reps:"", weight:"" }]}
                      recommendation={rec}
                      onAddSet={() => addSet(ex.id)}
                      onUpdateSet={(i, field, val) => updateSet(ex.id, i, field, val)}
                      intent={isWarmup ? undefined : intents[ex.id]}
                      onSetIntent={isWarmup ? undefined : setIntent}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {!done ? (
        <button onClick={handleFinish} disabled={totalLogged === 0}
          style={{ width:"100%", marginTop:8, background:totalLogged>0?"#c8b870":"#1a1a1a",
            color:totalLogged>0?"#1a1a00":"#333", border:"none", borderRadius:8, padding:14,
            fontSize:15, fontWeight:700, cursor:totalLogged>0?"pointer":"not-allowed" }}>
          {totalLogged > 0 ? `Finish Session — ${totalLogged} exercises logged` : "Log at least one exercise"}
        </button>
      ) : (
        <>
          <div style={{ background:"#0d150d", border:"1px solid #2a4a2a", borderRadius:8, padding:14, marginTop:8 }}>
            <div style={{ color:"#6aaa6a", fontWeight:700, marginBottom:3 }}>✓ Session saved</div>
            <div style={{ color:"#555", fontSize:12 }}>Talk to the coach below.</div>
          </div>
          <PostSessionChat workout={fakeWorkout} rounds={fakeRounds} loggedSets={loggedSets} meta={meta} />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// LIBRARY VIEW — browse + pick exercises
// ─────────────────────────────────────────────
function LibraryView({ onBack, onStartCustom }) {
  // selectedExercises: { [groupIndex]: Set of exercise ids }
  const [selected, setSelected] = useState({});
  const [expanded, setExpanded] = useState({ 0: true }); // warm-up open by default
  const [search, setSearch] = useState("");
  const [activeTemplate, setActiveTemplate] = useState(null);

  const applyTemplate = (tmpl) => {
    if (activeTemplate === tmpl.id) {
      // toggle off
      setActiveTemplate(null);
      setSelected({});
    } else {
      setActiveTemplate(tmpl.id);
      const newSel = {};
      Object.entries(tmpl.selections).forEach(([gi, ids]) => {
        newSel[parseInt(gi)] = new Set(ids);
      });
      setSelected(newSel);
    }
  };

  const totalSelected = Object.values(selected).reduce((sum, set) => sum + set.size, 0);

  const toggle = (groupIdx, exId) => {
    setSelected(prev => {
      const cur = new Set(prev[groupIdx] || []);
      if (cur.has(exId)) cur.delete(exId); else cur.add(exId);
      return { ...prev, [groupIdx]: cur };
    });
  };

  const toggleGroup = (idx) => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));

  const clearAll = () => setSelected({});

  const buildSessions = () => {
    const sections = [];
    EXERCISE_LIBRARY.forEach((group, gi) => {
      const sel = selected[gi];
      if (!sel || sel.size === 0) return;
      const exercises = group.exercises.filter(ex => sel.has(ex.id));
      sections.push({ group: group.group, icon: group.icon, color: group.color, description: group.description, exercises });
    });
    // Always put Warm-Up first
    const warmup = sections.find(s => s.group === "Warm-Up");
    const rest = sections.filter(s => s.group !== "Warm-Up");
    onStartCustom(warmup ? [warmup, ...rest] : rest);
  };

  const matchesSearch = (name) => !search || name.toLowerCase().includes(search.toLowerCase());

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <button onClick={onBack}
          style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
        <div style={{ flex:1 }}>
          <div style={{ color:"#c8b870", fontSize:17, fontWeight:700 }}>Exercise Library</div>
          <div style={{ color:"#444", fontSize:11 }}>Pick exercises → build your session</div>
        </div>
        {totalSelected > 0 && (
          <button onClick={clearAll}
            style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 8px", cursor:"pointer", fontSize:11 }}>
            Clear
          </button>
        )}
      </div>

      {/* Templates */}
      <div style={{ marginBottom:14 }}>
        <div style={{ color:"#444", fontSize:10, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Start from a template</div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, WebkitOverflowScrolling:"touch" }}>
          {TEMPLATES.map(tmpl => {
            const isActive = activeTemplate === tmpl.id;
            return (
              <div key={tmpl.id} onClick={() => applyTemplate(tmpl)}
                style={{ flexShrink:0, background: isActive ? `${tmpl.color}22` : "#0d0d0d",
                  border:`1px solid ${isActive ? tmpl.color : "#2a2a2a"}`,
                  borderRadius:8, padding:"10px 12px", cursor:"pointer", minWidth:130, maxWidth:150 }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{tmpl.icon}</div>
                <div style={{ color: isActive ? tmpl.color : "#888", fontSize:12, fontWeight:700, lineHeight:1.2 }}>{tmpl.name}</div>
                <div style={{ color:"#333", fontSize:10, marginTop:3 }}>{tmpl.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search exercises..."
        style={{ width:"100%", background:"#141414", border:"1px solid #2a2a2a", borderRadius:8,
          color:"#c0c0a0", padding:"10px 14px", fontSize:13, marginBottom:14, boxSizing:"border-box" }}
      />

      {/* Groups */}
      {EXERCISE_LIBRARY.map((group, gi) => {
        const groupSelected = selected[gi] || new Set();
        const isWarmup = group.group === "Warm-Up";
        const isOpen = expanded[gi];
        const filtered = group.exercises.filter(ex => matchesSearch(ex.name));
        if (search && filtered.length === 0) return null;
        return (
          <div key={gi} style={{ background:"#0d0d0d", border:`1px solid ${isWarmup?"#2a2a1a":"#1e1e1e"}`, borderRadius:8, marginBottom:8, overflow:"hidden" }}>
            {/* Group header */}
            <div style={{ display:"flex", alignItems:"center", padding:"11px 14px", cursor:"pointer",
              background: isWarmup ? "#111100" : "#0d0d0d" }}
              onClick={() => toggleGroup(gi)}>
              <span style={{ fontSize:18, marginRight:8 }}>{group.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ color: groupSelected.size > 0 ? group.color : isWarmup ? "#8a8a60" : "#c8b870", fontWeight:700, fontSize:14 }}>
                  {group.group}
                  {groupSelected.size > 0 && <span style={{ color:"#5a8a5a", fontSize:11, marginLeft:8 }}>({groupSelected.size} selected)</span>}
                </div>
                <div style={{ color:"#333", fontSize:10 }}>{group.description}</div>
              </div>
              <span style={{ color:"#333", fontSize:12 }}>{isOpen?"▲":"▼"}</span>
            </div>

            {/* Exercises */}
            {(isOpen || search) && (
              <div style={{ borderTop:"1px solid #1a1a1a" }}>
                {filtered.map(ex => {
                  const isSel = groupSelected.has(ex.id);
                  return (
                    <div key={ex.id} onClick={() => toggle(gi, ex.id)}
                      style={{ display:"flex", alignItems:"center", padding:"9px 14px",
                        borderBottom:"1px solid #141414", cursor:"pointer",
                        background: isSel ? "#0d1a0d" : "transparent" }}>
                      <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${isSel?"#5a8a5a":"#2a2a2a"}`,
                        background: isSel ? "#5a8a5a" : "transparent", marginRight:10, flexShrink:0,
                        display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {isSel && <span style={{ color:"#fff", fontSize:12, lineHeight:1 }}>✓</span>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ color: isSel ? "#a0d0a0" : "#c8c8a0", fontSize:13, fontWeight: isSel ? 600 : 400 }}>
                          {ex.name}
                          {ex.bw && <span style={{ color:"#4a6a4a", fontSize:10, marginLeft:6 }}>BW</span>}
                        </div>
                        <div style={{ color:"#333", fontSize:11, fontStyle:"italic" }}>{ex.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ height:80 }} />

      {/* Floating start button */}
      {totalSelected > 0 && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, padding:"12px 16px",
          background:"linear-gradient(transparent, #080808 40%)", pointerEvents:"none" }}>
          <button onClick={buildSessions}
            style={{ width:"100%", maxWidth:480, margin:"0 auto", display:"block",
              background:"#c8b870", color:"#1a1a00", border:"none", borderRadius:10,
              padding:"14px 20px", fontSize:15, fontWeight:700, cursor:"pointer", pointerEvents:"all" }}>
            Start Workout — {totalSelected} exercise{totalSelected !== 1 ? "s" : ""} →
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// HISTORY VIEW
// ─────────────────────────────────────────────
function HistoryView({ log, onBack }) {
  const sessions = Object.entries(log).sort((a,b) => new Date(b[0])-new Date(a[0]));
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
        <span style={{ color:"#c8b870", fontSize:17, fontWeight:700 }}>Session History</span>
      </div>
      {sessions.length === 0 && <p style={{ color:"#333", textAlign:"center", marginTop:40 }}>No sessions yet.</p>}
      {sessions.map(([date, s]) => (
        <div key={date} style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:8, padding:14, marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ color:"#c8b870", fontWeight:600 }}>{s.workoutName}</span>
            <span style={{ color:"#444", fontSize:11 }}>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div style={{ color:"#444", fontSize:12 }}>{s.exerciseCount} exercises logged</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// ALL WORKOUTS VIEW
// ─────────────────────────────────────────────
function AllView({ onPick, onBack }) {
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
        <span style={{ color:"#c8b870", fontSize:17, fontWeight:700 }}>All Workouts</span>
      </div>
      {WORKOUTS.map(w => (
        <div key={w.id} onClick={() => onPick(w)}
          style={{ background:"#0d0d0d", border:`1px solid ${w.color}33`, borderRadius:8, padding:14, marginBottom:8, cursor:"pointer" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:22 }}>{w.icon}</span>
            <div>
              <div style={{ color:"#c8b870", fontWeight:600, fontSize:14 }}>{w.name}</div>
              <div style={{ color:"#555", fontSize:12 }}>{w.focus}</div>
            </div>
            <span style={{ marginLeft:"auto", color:"#333", fontSize:11 }}>
              {w.bank.push.length + w.bank.pull.length + w.bank.stabilizer.length} in bank →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// CARDIO VIEW
// ─────────────────────────────────────────────
function CardioView({ exHistory, onBack, onComplete }) {
  const [activity, setActivity] = useState(null);
  const [fields, setFields] = useState({ time:"", distance:"", heartRate:"", intensity:5 });
  const [intent, setIntentState] = useState(null);
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const update = (field, val) => setFields(prev => ({ ...prev, [field]: val }));
  const toggleIntent = (v) => setIntentState(prev => prev === v ? null : v);

  const hasData = fields.time || fields.distance || fields.heartRate;

  const handleFinish = () => {
    setDone(true);
    onComplete("cardio", {}, [], `Cardio: ${activity.name}`, {}, { activity, fields, intent, notes });
  };

  const startChat = async () => {
    setChatStarted(true); setLoading(true);
    const prompt = `You are a direct, no-fluff endurance coach. The athlete is a competitive ultra-endurance paddler (Yukon 1000 5th place) rebuilding fitness.
Activity: ${activity.name}
Duration: ${fields.time || "not logged"}
Distance: ${fields.distance || "not logged"}
Avg Heart Rate: ${fields.heartRate || "not logged"}
Intensity (1-10): ${fields.intensity}
Intent next time: ${intent === "+" ? "push harder" : intent === "-" ? "back off" : intent === "=" ? "same effort" : "not set"}
Athlete notes: ${notes || "none"}

Give specific feedback on this session. 3–5 sentences.`;
    const reply = await callClaude([{ role:"user", content: prompt }]);
    setMsgs([{ role:"assistant", content:reply }]);
    setLoading(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || loading) return;
    const userMsg = { role:"user", content:chatInput };
    const history = [...msgs, userMsg];
    setMsgs(history); setChatInput(""); setLoading(true);
    const reply = await callClaude(history);
    setMsgs([...history, { role:"assistant", content:reply }]);
    setLoading(false);
  };

  // ─── Activity Picker ───
  if (!activity) {
    return (
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <button onClick={onBack} style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
          <div style={{ color:"#c8b870", fontSize:17, fontWeight:700 }}>Cardio Session</div>
        </div>
        <div style={{ color:"#555", fontSize:12, marginBottom:16 }}>Choose your activity</div>
        {CARDIO_ACTIVITIES.map(act => {
          const lastSessions = exHistory[act.id] || [];
          const last = lastSessions.length > 0 ? lastSessions[lastSessions.length - 1] : null;
          return (
            <div key={act.id} onClick={() => setActivity(act)}
              style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:8, padding:"14px 16px", marginBottom:8, cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <span style={{ fontSize:28 }}>{act.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#c8c8a0", fontSize:15, fontWeight:600 }}>{act.name}</div>
                  {last && (
                    <div style={{ color:"#333", fontSize:11, marginTop:2 }}>
                      Last: {new Date(last.date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                      {last.fields?.time ? ` · ${last.fields.time}` : ""}
                      {last.fields?.distance ? ` · ${last.fields.distance}` : ""}
                    </div>
                  )}
                </div>
                <span style={{ color:"#333", fontSize:14 }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ─── Logging Form ───
  const lastSessions = exHistory[activity.id] || [];
  const lastCardio = lastSessions.length > 0 ? lastSessions[lastSessions.length - 1] : null;

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <button onClick={() => setActivity(null)} style={{ background:"none", border:"1px solid #2a2a2a", color:"#555", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>← Back</button>
        <div>
          <div style={{ color:"#5a8aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{activity.icon} Cardio</div>
          <div style={{ color:"#d0c090", fontSize:17, fontWeight:700 }}>{activity.name}</div>
        </div>
      </div>

      {/* Previous session */}
      {lastCardio && (
        <div style={{ background:"#111a11", border:"1px solid #2a4a2a33", borderRadius:6, padding:"8px 12px", marginBottom:12 }}>
          <div style={{ color:"#4a6a4a", fontSize:10, marginBottom:3 }}>Last: {new Date(lastCardio.date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
          <div style={{ color:"#888", fontSize:12 }}>
            {[lastCardio.fields?.time, lastCardio.fields?.distance && `${lastCardio.fields.distance}`, lastCardio.fields?.heartRate && `HR ${lastCardio.fields.heartRate}`, `Intensity ${lastCardio.fields?.intensity}/10`].filter(Boolean).join(" · ")}
          </div>
          {lastCardio.nextIntent && (
            <div style={{ color: lastCardio.nextIntent==="+" ? "#5aaa5a" : lastCardio.nextIntent==="-" ? "#aa5a5a" : "#5a5aaa", fontSize:10, marginTop:3 }}>
              You flagged: {lastCardio.nextIntent==="+" ? "↑ push harder" : lastCardio.nextIntent==="-" ? "↓ back off" : "= same effort"}
            </div>
          )}
        </div>
      )}

      {/* Fields */}
      <div style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:8, padding:14, marginBottom:10 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
          <div>
            <div style={{ color:"#555", fontSize:10, marginBottom:4 }}>TIME</div>
            <input placeholder="e.g. 1h 30m" value={fields.time} onChange={e => update("time",e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", background:"#181818", border:"1px solid #2a2a2a", borderRadius:4, color:"#c8c8a0", padding:"6px 8px", fontSize:13 }} />
          </div>
          <div>
            <div style={{ color:"#555", fontSize:10, marginBottom:4 }}>DISTANCE</div>
            <input placeholder="e.g. 12 mi" value={fields.distance} onChange={e => update("distance",e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", background:"#181818", border:"1px solid #2a2a2a", borderRadius:4, color:"#c8c8a0", padding:"6px 8px", fontSize:13 }} />
          </div>
          <div>
            <div style={{ color:"#555", fontSize:10, marginBottom:4 }}>AVG HEART RATE</div>
            <input placeholder="e.g. 145 bpm" value={fields.heartRate} onChange={e => update("heartRate",e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", background:"#181818", border:"1px solid #2a2a2a", borderRadius:4, color:"#c8c8a0", padding:"6px 8px", fontSize:13 }} />
          </div>
          <div>
            <div style={{ color:"#555", fontSize:10, marginBottom:6 }}>INTENSITY — {fields.intensity}/10</div>
            <input type="range" min={1} max={10} value={fields.intensity} onChange={e => update("intensity",e.target.value)}
              style={{ width:"100%", accentColor:"#c8b870" }} />
          </div>
        </div>

        {/* Intent */}
        <div style={{ marginBottom:12 }}>
          <div style={{ color:"#555", fontSize:10, marginBottom:6 }}>NEXT SESSION INTENT</div>
          <div style={{ display:"flex", gap:8 }}>
            {["-","=","+"].map(v => {
              const active = intent === v;
              const col = v==="+" ? "#5aaa5a" : v==="-" ? "#aa5a5a" : "#5a5aaa";
              const bg  = v==="+" ? "#0d1f0d"  : v==="-" ? "#1f0d0d"  : "#0d0d1f";
              return (
                <button key={v} onClick={() => toggleIntent(v)}
                  style={{ flex:1, background: active ? bg : "#181818",
                    border:`1px solid ${active ? col : "#2a2a2a"}`,
                    color: active ? col : "#555",
                    borderRadius:6, padding:"10px 0", cursor:"pointer", fontSize:18, fontWeight:700 }}>
                  {v==="+" ? "↑" : v==="-" ? "↓" : "="}
                </button>
              );
            })}
          </div>
          {intent && <div style={{ color:"#555", fontSize:11, marginTop:5, textAlign:"center" }}>
            {intent==="+" ? "Push harder next time" : intent==="-" ? "Back off next time" : "Same effort next time"}
          </div>}
        </div>

        {/* Notes */}
        <div>
          <div style={{ color:"#555", fontSize:10, marginBottom:4 }}>NOTES TO COACH</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="How'd it feel? Any issues? Weather, terrain, heart rate spikes..."
            style={{ width:"100%", boxSizing:"border-box", background:"#181818", border:"1px solid #2a2a2a",
              borderRadius:4, color:"#c8c8a0", padding:"8px 10px", fontSize:13,
              minHeight:70, resize:"vertical", fontFamily:"inherit" }} />
        </div>
      </div>

      {/* Finish */}
      {!done ? (
        <button onClick={handleFinish} disabled={!hasData}
          style={{ width:"100%", background: hasData ? "#c8b870" : "#1a1a1a",
            color: hasData ? "#1a1a00" : "#333", border:"none", borderRadius:8, padding:14,
            fontSize:15, fontWeight:700, cursor: hasData ? "pointer" : "not-allowed", marginBottom:10 }}>
          {hasData ? "Log Cardio Session" : "Fill in at least one field"}
        </button>
      ) : (
        <>
          <div style={{ background:"#0d150d", border:"1px solid #2a4a2a", borderRadius:8, padding:14, marginBottom:10 }}>
            <div style={{ color:"#6aaa6a", fontWeight:700, marginBottom:3 }}>✓ Session saved</div>
            <div style={{ color:"#555", fontSize:12 }}>Talk to the coach below.</div>
          </div>
          {!chatStarted ? (
            <button onClick={startChat}
              style={{ width:"100%", background:"#101a10", border:"1px solid #2a4a2a", color:"#6aaa6a", borderRadius:8, padding:14, fontSize:14, cursor:"pointer", fontWeight:600 }}>
              🤖 Get Coaching Feedback
            </button>
          ) : (
            <div style={{ background:"#0a0f0a", border:"1px solid #1a2a1a", borderRadius:8, overflow:"hidden" }}>
              <div style={{ maxHeight:300, overflowY:"auto", padding:14 }}>
                {msgs.map((m,i) => (
                  <div key={i} style={{ marginBottom:14 }}>
                    <div style={{ color:m.role==="assistant"?"#6aaa6a":"#c8b870", fontSize:10, fontWeight:700, marginBottom:3, textTransform:"uppercase", letterSpacing:1 }}>
                      {m.role==="assistant" ? "Coach" : "You"}
                    </div>
                    <div style={{ color:"#aaa", fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{m.content}</div>
                  </div>
                ))}
                {loading && <div style={{ color:"#3a5a3a", fontSize:13, fontStyle:"italic" }}>Thinking...</div>}
                <div ref={bottomRef} />
              </div>
              <div style={{ display:"flex", gap:8, padding:"10px 14px", borderTop:"1px solid #1a2a1a" }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && !e.shiftKey && sendChat()}
                  placeholder="Heart rate stayed high, legs felt heavy..."
                  style={{ flex:1, background:"#111", border:"1px solid #2a2a2a", borderRadius:6, color:"#c0c0a0", padding:"8px 12px", fontSize:13 }} />
                <button onClick={sendChat} disabled={loading}
                  style={{ background:"#1a2a1a", border:"1px solid #3a5a3a", color:"#6aaa6a", borderRadius:6, padding:"8px 14px", cursor:"pointer", fontSize:14, fontWeight:700 }}>→</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [customSections, setCustomSections] = useState(null);
  const [log, setLog] = useState({});
  const [exHistory, setExHistory] = useState({});
  const [meta, setMeta] = useState({ phase:1, sessionCount:0, lastWorkoutId:null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLog(storageLoad("wt-log", {}));
    setMeta(storageLoad("wt-meta", { phase:1, sessionCount:0, lastWorkoutId:null }));
    setExHistory(storageLoad("wt-exhistory", {}));
    setReady(true);
  }, []);

  const getUpNext = () => {
    if (!meta.lastWorkoutId) return WORKOUTS.find(w => w.id === SEQUENCE[0]);
    const idx = SEQUENCE.indexOf(meta.lastWorkoutId);
    const nextId = SEQUENCE[(idx + 1) % SEQUENCE.length];
    return WORKOUTS.find(w => w.id === nextId);
  };

  const startWorkout = (w) => { setActiveWorkout(w); setView("session"); };

  const startCustom = (sections) => { setCustomSections(sections); setView("custom-session"); };

  const startCardio = () => setView("cardio");

  const handleComplete = async (workoutId, loggedSets, rounds, customFocus, intents = {}, cardioData = null) => {
    const workout = workoutId === "custom"
      ? { name:"Custom Build", focus: customFocus || "Custom" }
      : workoutId === "cardio"
      ? { name:`Cardio: ${cardioData?.activity?.name || "Session"}`, focus:"Cardio" }
      : WORKOUTS.find(w => w.id === workoutId);
    const key = new Date().toISOString();
    const newCount = meta.sessionCount + 1;
    const newPhase = newCount >= 17 ? 3 : newCount >= 9 ? 2 : 1;
    const newMeta = { phase:newPhase, sessionCount:newCount, lastWorkoutId: (workoutId !== "custom" && workoutId !== "cardio") ? workoutId : meta.lastWorkoutId };
    const newExHistory = { ...exHistory };
    rounds.forEach(round => {
      (round.exercises || []).forEach(ex => {
        const sets = (loggedSets[ex.id] || []).filter(s => s.reps);
        if (sets.length) {
          if (!newExHistory[ex.id]) newExHistory[ex.id] = [];
          newExHistory[ex.id] = [...newExHistory[ex.id], { date:key, sets, nextIntent: intents[ex.id] || null }].slice(-10);
        }
      });
    });
    // Cardio sessions stored in exHistory by activity id
    if (cardioData && cardioData.activity) {
      const actId = cardioData.activity.id;
      if (!newExHistory[actId]) newExHistory[actId] = [];
      newExHistory[actId] = [...newExHistory[actId], {
        date: key, fields: cardioData.fields, nextIntent: cardioData.intent || null, notes: cardioData.notes || ""
      }].slice(-10);
    }
    const newLog = { ...log, [key]: {
      workoutName: workout.name,
      exerciseCount: cardioData ? 1 : Object.values(loggedSets).filter(s => s.some(x => x.reps)).length
    }};
    setMeta(newMeta); setLog(newLog); setExHistory(newExHistory);
    await Promise.all([
      storageSave("wt-meta", newMeta),
      storageSave("wt-log", newLog),
      storageSave("wt-exhistory", newExHistory),
    ]);
  };

  if (!ready) return (
    <div style={{ background:"#080808", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span style={{ color:"#333" }}>Loading...</span>
    </div>
  );

  const upNext = getUpNext();

  return (
    <div style={{ background:"#080808", minHeight:"100vh", fontFamily:"'SF Mono','Fira Code',monospace", color:"#e0e0e0" }}>
      <div style={{ maxWidth:480, margin:"0 auto",
        paddingTop:"calc(env(safe-area-inset-top) + 20px)",
        paddingLeft:16, paddingRight:16, paddingBottom:60 }}>

        {view === "home" && <>
          <div style={{ marginBottom:20 }}>
            <div style={{ color:"#c8b870", fontSize:10, letterSpacing:3, textTransform:"uppercase", marginBottom:2 }}>Training System</div>
            <div style={{ color:"#c8b870", fontSize:26, fontWeight:900, letterSpacing:-1 }}>PROGRAM</div>
            <div style={{ color:"#2a2a2a", fontSize:11, marginTop:2 }}>Notebook rebuild · Round-based · Adaptive</div>
          </div>

          <PhaseBar meta={meta} />
          <UpNextCard workout={upNext} onStart={startWorkout} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div onClick={() => setView("all")}
              style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:8, padding:14, cursor:"pointer" }}>
              <div style={{ fontSize:20, marginBottom:4 }}>📋</div>
              <div style={{ color:"#888", fontSize:13 }}>All Workouts</div>
              <div style={{ color:"#333", fontSize:11 }}>{WORKOUTS.length} programs</div>
            </div>
            <div onClick={() => setView("history")}
              style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:8, padding:14, cursor:"pointer" }}>
              <div style={{ fontSize:20, marginBottom:4 }}>📈</div>
              <div style={{ color:"#888", fontSize:13 }}>History</div>
              <div style={{ color:"#333", fontSize:11 }}>{Object.keys(log).length} sessions</div>
            </div>
          </div>

          {/* Build Workout card — full width */}
          <div onClick={() => setView("library")}
            style={{ background:"linear-gradient(135deg, #0d1a0d, #0d0d0d)", border:"1px solid #2a4a2a",
              borderRadius:8, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
            <span style={{ fontSize:24 }}>🏗</span>
            <div style={{ flex:1 }}>
              <div style={{ color:"#6aaa6a", fontWeight:700, fontSize:14 }}>Build Custom Workout</div>
              <div style={{ color:"#333", fontSize:11 }}>
                {EXERCISE_LIBRARY.reduce((n, g) => n + g.exercises.length, 0)} exercises · {TEMPLATES.length} templates · warm-up included
              </div>
            </div>
            <span style={{ color:"#2a4a2a", fontSize:18 }}>→</span>
          </div>

          {/* Cardio card */}
          <div onClick={startCardio}
            style={{ background:"linear-gradient(135deg, #0d1520, #0d0d0d)", border:"1px solid #2a3a5a",
              borderRadius:8, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:24 }}>🌊</span>
            <div style={{ flex:1 }}>
              <div style={{ color:"#6a8aaa", fontWeight:700, fontSize:14 }}>Log Cardio Session</div>
              <div style={{ color:"#333", fontSize:11 }}>Hiking · Mountain Biking · Kayaking · SUP · ERG · Road Biking</div>
            </div>
            <span style={{ color:"#2a3a5a", fontSize:18 }}>→</span>
          </div>
        </>}

        {view === "session" && activeWorkout &&
          <SessionView workout={activeWorkout} meta={meta} exHistory={exHistory}
            onBack={() => setView("home")} onComplete={handleComplete} />}

        {view === "custom-session" && customSections &&
          <CustomSessionView sections={customSections} meta={meta} exHistory={exHistory}
            onBack={() => setView("library")} onComplete={handleComplete} />}

        {view === "history" && <HistoryView log={log} onBack={() => setView("home")} />}
        {view === "all" && <AllView onPick={startWorkout} onBack={() => setView("home")} />}
        {view === "library" && <LibraryView onBack={() => setView("home")} onStartCustom={startCustom} />}
        {view === "cardio" && <CardioView exHistory={exHistory} onBack={() => setView("home")} onComplete={handleComplete} />}
      </div>
    </div>
  );
}
