import json
L=[('s1a','jay',"What if I never pay my credit card?"),('s1b','devil',"Nothing. Trust me."),
('s2a','angel',"Day thirty. Your credit score drops."),('s2b','jay',"Seriously?"),
('s3a','angel',"Day sixty. Interest jumps to almost thirty percent."),('s3b','devil',"Sleep well, buddy."),
('s4a','angel',"Then collectors, a lawsuit, and your paycheck can be garnished."),('s4b','devil',"Ghosting is a lifestyle."),
('s5a','jay',"Jail?"),('s5b','angel',"No. But never ignore a court order."),
('s6a','angel',"Call your bank on day one."),('s6b','devil',"Boring."),('s6c','angel',"Cheap advice has a price.")]
V={'jay':('am_puck',1.15),'devil':('am_fenrir',1.0),'angel':('af_heart',1.05)}
json.dump([{'text':t,'voice':V[s][0],'speed':V[s][1],'out':f'vo/{i}_raw.wav'} for i,s,t in L],open('jobs.json','w'))
json.dump([{'id':i,'spk':s,'text':t} for i,s,t in L],open('lines.json','w'))
