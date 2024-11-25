; r.clp
(deftemplate mselem
 (slot elem )
 (slot idxap)
)

(defrule init
 (lista $? ?elem $?)
=> 
 (assert (elem ?elem))
)

(defrule creareElementeIntIndex
 ?idElem <- (elem ?elem)
=>
 (retract ?idElem)
 (assert (mselem (elem ?elem) (idxap 1)))
 (assert (index 2))
 (assert (init 1))
)

(defrule creareElemente
 (declare (salience 100))
 ?idElem <- (elem ?elem)
 ?idIndex <- (index ?i)
=>
 (retract ?idElem)
 (retract ?idIndex)
 (assert (mselem (elem ?elem) (idxap ?i)))
 (assert (index (+ ?i 1)))
)

(defrule cleanUp
 (declare (salience -100))
 ?id <- (index ?)
 ?idInit <- (init 1)
=>
 (retract ?id)
 (retract ?idInit)
)
