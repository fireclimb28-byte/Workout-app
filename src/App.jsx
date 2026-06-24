import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
// EXERCISE BANKS
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

// Sequence for "Up Next" — main 6 workouts in order, supplements optional
const SEQUENCE = [1, 3, 2, 4, 6, 5];

const PHASE = {
  1: { name:"Foundation", range:"Sessions 1–8",  sets:2, repsLow:10, repsHigh:12, intensity:"~60% effort. Pattern first, load later." },
  2: { name:"Build",      range:"Sessions 9–16", sets:3, repsLow:8,  repsHigh:10, intensity:"~70% effort. Add weight when you hit top of range two sessions running." },
  3: { name:"Strength",   range:"Sessions 17+",  sets:4, repsLow:5,  repsHigh:8,  intensity:"~80% effort. Push closer to failure. Deload every 4th week." },
};

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

  const lastReps = lastSets.map(s => parseInt(s.reps) || 0);
  const lastWeights = lastSets.map(s => s.weight || "BW");
  const avgReps = Math.round(lastReps.reduce((a, b) => a + b, 0) / lastReps.length);
  const lastWeight = lastWeights[lastWeights.length - 1];
  const isBodyweight = !lastWeight || lastWeight === "BW" || lastWeight === "" || isNaN(parseFloat(lastWeight));

  const targetHigh = PHASE[phase].repsHigh;
  const targetLow = PHASE[phase].repsLow;

  let rec = "";
  let badge = "same";

  if (isBodyweight) {
    if (avgReps >= targetHigh) { rec = `Hit ${avgReps} reps — add light load or progress variation`; badge = "up"; }
    else if (avgReps < targetLow - 2) { rec = `${avgReps} reps last time — focus on form, same variation`; badge = "same"; }
    else { rec = `${avgReps} reps last time — push for ${Math.min(avgReps + 1, targetHigh)}`; badge = "same"; }
  } else {
    const w = parseFloat(lastWeight);
    if (avgReps >= targetHigh) { const nextW = Math.ceil(w * 1.05 / 2.5) * 2.5; rec = `${avgReps} reps @ ${w} — try ${nextW} lbs`; badge = "up"; }
    else if (avgReps < targetLow - 1) { const dropW = Math.floor(w * 0.95 / 2.5) * 2.5; rec = `${avgReps} reps @ ${w} — consider dropping to ${dropW} lbs`; badge = "down"; }
    else { rec = `${avgReps} reps @ ${w} lbs — stay here, push for ${Math.min(avgReps + 1, targetHigh)} reps`; badge = "same"; }
  }

  return {
    rec,
    badge,
    lastDate: new Date(last.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }),
    lastSets,
    lastWeights,
  };
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

Workout: ${workout.name} — ${workout.focus}
Phase: ${phase.name} (${phase.range}) — ${phase.intensity}
Target: ${phase.sets} sets × ${phase.repsLow}–${phase.repsHigh} reps

Session log:
${logSummary}

Review this log, flag anything off, and suggest next-session targets. 3–5 sentences max unless asked to elaborate.`;
}

// ─────────────────────────────────────────────
// COMPONENTS
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
        borderRadius:10, padding:"16px 18px", marginBottom:16, cursor:"pointer", transition:"all 0.15s" }}>
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

function ExerciseRow({ ex, sets, recommendation, onAddSet, onUpdateSet }) {
  const badgeColor = { up:"#5aaa5a", down:"#aa6a5a", same:"#5a6aaa" };
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
    </div>
  );
}

function RoundCard({ round, roundIdx, loggedSets, exHistory, phase, onAddSet, onUpdateSet }) {
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
    const reply = await callClaude([
      { role:"user", content: systemPrompt + "\n\nBriefly review what I logged and give me your take. Then ask what I want to dig into." }
    ]);
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
          style={{ width:"100%", background:"#101a10", border:"1px solid #2a4a2a", color:"#6aaa6a",
            borderRadius:8, padding:14, fontSize:14, cursor:"pointer", fontWeight:600 }}>
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

function SessionView({ workout, meta, exHistory, onBack, onComplete }) {
  const [loggedSets, setLoggedSets] = useState({});
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

  const totalLogged = Object.values(loggedSets).filter(s => s.some(x => x.reps)).length;

  const handleFinish = () => { setDone(true); onComplete(workout.id, loggedSets, rounds); };

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
          exHistory={exHistory} phase={meta.phase} onAddSet={addSet} onUpdateSet={updateSet} />
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
// APP
// ─────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [log, setLog] = useState({});
  const [exHistory, setExHistory] = useState({}); // { exId: [{date, sets}] }
  const [meta, setMeta] = useState({ phase:1, sessionCount:0, lastWorkoutId:null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLog(storageLoad("wt-log", {}));
    setMeta(storageLoad("wt-meta", { phase:1, sessionCount:0, lastWorkoutId:null }));
    setExHistory(storageLoad("wt-exhistory", {}));
    setReady(true);
  }, []);

  // Derive "Up Next" from last workout
  const getUpNext = () => {
    if (!meta.lastWorkoutId) return WORKOUTS.find(w => w.id === SEQUENCE[0]);
    const idx = SEQUENCE.indexOf(meta.lastWorkoutId);
    const nextId = SEQUENCE[(idx + 1) % SEQUENCE.length];
    return WORKOUTS.find(w => w.id === nextId);
  };

  const startWorkout = (w) => { setActiveWorkout(w); setView("session"); };

  const handleComplete = async (workoutId, loggedSets, rounds) => {
    const workout = WORKOUTS.find(w => w.id === workoutId);
    const key = new Date().toISOString();
    const newCount = meta.sessionCount + 1;
    const newPhase = newCount >= 17 ? 3 : newCount >= 9 ? 2 : 1;
    const newMeta = { phase:newPhase, sessionCount:newCount, lastWorkoutId:workoutId };

    // Update per-exercise history
    const newExHistory = { ...exHistory };
    rounds.forEach(round => {
      round.exercises.forEach(ex => {
        const sets = (loggedSets[ex.id] || []).filter(s => s.reps);
        if (sets.length) {
          if (!newExHistory[ex.id]) newExHistory[ex.id] = [];
          newExHistory[ex.id] = [...newExHistory[ex.id], { date:key, sets }].slice(-10); // keep last 10
        }
      });
    });

    const newLog = { ...log, [key]: {
      workoutName: workout.name,
      exerciseCount: Object.values(loggedSets).filter(s => s.some(x => x.reps)).length
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
      <div style={{ maxWidth:480, margin:"0 auto", padding:"20px 16px 60px" }}>

        {view === "home" && <>
          <div style={{ marginBottom:20 }}>
            <div style={{ color:"#c8b870", fontSize:10, letterSpacing:3, textTransform:"uppercase", marginBottom:2 }}>Training System</div>
            <div style={{ color:"#c8b870", fontSize:26, fontWeight:900, letterSpacing:-1 }}>PROGRAM</div>
            <div style={{ color:"#2a2a2a", fontSize:11, marginTop:2 }}>Notebook rebuild · Round-based · Adaptive</div>
          </div>

          <PhaseBar meta={meta} />
          <UpNextCard workout={upNext} onStart={startWorkout} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
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
        </>}

        {view === "session" && activeWorkout &&
          <SessionView workout={activeWorkout} meta={meta} exHistory={exHistory}
            onBack={() => setView("home")} onComplete={handleComplete} />}

        {view === "history" && <HistoryView log={log} onBack={() => setView("home")} />}
        {view === "all" && <AllView onPick={startWorkout} onBack={() => setView("home")} />}
      </div>
    </div>
  );
}
